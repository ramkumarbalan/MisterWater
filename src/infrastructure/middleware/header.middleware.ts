// headers.middleware.ts

import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateHeadersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requiredHeader = 'role';
    if (req.headers[requiredHeader]) {
      req.body.role = req.headers[requiredHeader];
    }
    // Continue to the next middleware or route handler
    next();
  }
}
