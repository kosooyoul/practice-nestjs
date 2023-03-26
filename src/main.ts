import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { graphqlUploadExpress } from 'graphql-upload';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, skipMissingProperties: true }));

  app.use(
    graphqlUploadExpress({
      maxFileSize: 500000000,
      maxFiles: 10,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'assets/public'));
  app.setBaseViewsDir(join(__dirname, '..', 'assets/views'));
  app.setViewEngine('hbs');

  const config = new DocumentBuilder()
    .setTitle(process.env.TITLE)
    .setDescription(process.env.DESCRIPTION)
    .setVersion('0.0.1')
    .addBearerAuth({ type: 'http', scheme: 'bearer', name: 'JWT', in: 'header' }, 'access-token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/v0/docs', app, document);

  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
