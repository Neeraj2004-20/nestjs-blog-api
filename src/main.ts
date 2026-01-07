import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('A complete blog API with authentication')
    .setVersion('2.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  const port = parseInt(process.env.PORT || '3000', 10);
  const appUrl = process.env.APP_URL || process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : `http://localhost:${port}`;
  
  await app.listen(port);
  console.log(`🚀 Application is running on: ${appUrl}`);
  console.log(`📚 Swagger docs: ${appUrl}/api`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}
bootstrap();
