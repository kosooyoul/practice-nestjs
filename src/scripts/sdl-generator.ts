import { NestFactory } from '@nestjs/core';
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from '@nestjs/graphql';
import { writeFileSync } from 'fs';
import { GraphQLSchema, printSchema } from 'graphql';
import { join } from 'path';
import { HanulseGraphQLResolvers } from '../hanulse/interface/graphql.module';
import { HanulseAdminGraphQLResolvers } from '../hanulse-admin/interface/graphql.module';

async function generateGraphQLSchema(resolvers: any[]): Promise<GraphQLSchema> {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create(resolvers);

  return schema;
}

async function generate() {
  const hanulseSchema = await generateGraphQLSchema(HanulseGraphQLResolvers);
  writeFileSync(join(process.cwd(), `/sdl/hanulse-schema.gql`), printSchema(hanulseSchema));

  const hanulseAdminSchema = await generateGraphQLSchema(HanulseAdminGraphQLResolvers);
  writeFileSync(join(process.cwd(), `/sdl/hanulse-admin-schema.gql`), printSchema(hanulseAdminSchema));
}

generate();
