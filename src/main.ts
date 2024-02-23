import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ResponseTransformInterceptor } from './infrastructure/interceptor/response-transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  await app.listen(process.env.PORT, () => {
    console.log(
      '======== SERVER IS LISTENING ON ============',
      process.env.PORT,
    );
  });
}
bootstrap();
