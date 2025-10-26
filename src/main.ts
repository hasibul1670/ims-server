import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips away properties that are not in the DTO
      transform: true, // Automatically transforms payloads to be objects typed according to their DTO classes
    }),
  );
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // --- 3. Swagger Configuration ---
  const config = new DocumentBuilder()
    .setTitle('IMS Server API')
    .setDescription('Inventory Management System API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // --- 4. Start the Server ---
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
