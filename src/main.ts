import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger - Catálogo de filmes')
    .setDescription(
      'Essa aplicação foi feit com o objetivo de permitir que um usuário, se autenticado, possa criar e manipular um catálogo de filmes contendo várias informações diferentes, como data de lançamento, descrição, título, diretor, genêro e nota (de 1 a 5)',
    )
    .setVersion('1.0')
    .addTag('users')
    .addTag('movies')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(10000);
}
bootstrap();
