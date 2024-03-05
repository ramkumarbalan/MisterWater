import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './infrastructure/exception-filter/http-exception.filters';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ValidateHeadersMiddleware } from './infrastructure/middleware/header.middleware';
import { UserModule } from './v1/user/user.module';
import { CommounityMasterModule } from './v1/community_master/community_master.module';
import { VendorModule } from './v1/vendor/vendor.module';
import { CommunityDetailMasterModule } from './v1/community_detail_master/community_detail_master.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    InfrastructureModule,
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    CommunityDetailMasterModule,
    VendorModule,
    CommounityMasterModule,
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
