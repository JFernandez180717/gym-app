import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global DTO validation and transformation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
      exceptionFactory: (validationErrors) => {
        const errors = validationErrors.map(err => ({
          property: err.property,
          constraints: err.constraints ? Object.values(err.constraints) : [],
        }));

        return new BadRequestException({
          statusCode: 400,
          message: 'Error de validación',
          errors,
        });
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
