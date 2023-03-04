import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from '@nestjs/graphql';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { printSchema } from 'graphql';
import { graphqlUploadExpress } from 'graphql-upload';
import { join } from 'path';
import { AppModule } from './app.module';
import { HanulseGraphQLResolvers } from './hanulse/interfaces/graphql.module';
import { HanulseAdminGraphQLResolvers } from './hanulse-admin/interfaces/graphql.module';

async function generateGraphQLSchema(serviceName: any, resolvers: any[]): Promise<void> {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create(resolvers);

  writeFileSync(join(process.cwd(), `/sdl/${serviceName}-schema.gql`), printSchema(schema));
}

async function bootstrap() {
  await generateGraphQLSchema('hanulse', HanulseGraphQLResolvers);
  await generateGraphQLSchema('hanulse-admin', HanulseAdminGraphQLResolvers);

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, skipMissingProperties: true }));

  app.use(
    graphqlUploadExpress({
      maxFileSize: 500000000,
      maxFiles: 10,
    }),
  );

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
