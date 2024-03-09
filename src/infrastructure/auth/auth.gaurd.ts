/* eslint-disable prettier/prettier */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { formatErrorResponse } from '../response-formatter/response-formatter';
import { UserService } from 'src/modules/v1/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      throw formatErrorResponse({message: 'Unauthorized'}, 401);
    }
    const decoded = await this.validateToken(request.headers.authorization);
    // return true;
    const user = JSON.parse(JSON.stringify(decoded));
    const findUser = await this.userService.findById(user.id);
    if (findUser) {
      if(!roles) {
        context.switchToHttp().getRequest().user = user;
        return true
      }
      if (roles.includes(findUser.role)) {
        context.switchToHttp().getRequest().user = user;
        return true;
      } else {
        throw formatErrorResponse({message: 'Unauthorized'}, 401);
      }
    } else {
      throw formatErrorResponse({message: 'Unauthorized'}, 401);
    }
  }

  async validateToken(token: string) {
    if (token.split(' ')[0] !== 'Bearer') {
      throw formatErrorResponse({message: 'Invalid Token'}, HttpStatus.BAD_REQUEST);
    } else {
      const auth = token.split(' ')[1];
      try {
        const decoded = await jwt.verify(auth,process.env.JWT_SECRET);
        return decoded;
      } catch (e) {
        const message = 'Token Error ' + (e.message || e.name);
        throw formatErrorResponse({message}, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
