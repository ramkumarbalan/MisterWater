import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './infrastructure/exception-filter/http-exception.filters';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidateHeadersMiddleware } from './infrastructure/middleware/header.middleware';
import { UserModule } from './v1/modules/user/user.module';
import { AddressMasterModule } from './v1/modules/address_master/address_master.module';
import { VendorModule } from './v1/modules/vendor/vendor.module';
import { AddressModule } from './v1/modules/address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    InfrastructureModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    AddressModule,
    VendorModule,
    AddressMasterModule,
    InfrastructureModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateHeadersMiddleware).forRoutes('/*');
  }
}
