import { GlobalConfig } from '@/global/config/config';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { DynamicModule } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GraphQLModule, GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError, GraphQLSchema, printSchema } from 'graphql';
import { GlobalErrorCodes } from '@/global/common/error-codes';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import GlobalStringUtils from '@/global/common/utils/string.utils';

export interface IGraphQLOptions {
  path: string;
  module: any;
  resolvers: any[];
}

async function generateGraphQLSchema(resolvers: any[]): Promise<GraphQLSchema> {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create(resolvers);

  return schema;
}

function saveTempTextFile(text: string): string {
  const hash = GlobalStringUtils.hashObject(text);
  const filepath = join(process.cwd(), `/.temp/${hash}`);
  mkdirSync(join(process.cwd(), '/.temp/'), { recursive: true });
  writeFileSync(filepath, text);
  return filepath;
}

export const DefaultGraphQLModule = (options: IGraphQLOptions): DynamicModule => {
  return GraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    imports: [options.module],
    useFactory: async (): Promise<Omit<ApolloDriverConfig, 'driver'>> => {
      const schema = await generateGraphQLSchema(options.resolvers);
      const filepath = saveTempTextFile(printSchema(schema));

      return {
        cors: true,
        playground: GlobalConfig.PLAYGROUND_ENABLED,
        introspection: GlobalConfig.PLAYGROUND_ENABLED,
        debug: GlobalConfig.PLAYGROUND_ENABLED,
        autoSchemaFile: false,
        typePaths: [filepath],
        // schema: schema,
        formatError: (error: GraphQLError): GraphQLFormattedError => {
          const originalError = error.originalError;
          if (originalError) {
            return {
              message: originalError.message,
              extensions: { code: GlobalErrorCodes.UNKNOWN_ERROR },
            };
          }
        },
        include: [options.module],
        disableHealthCheck: true,
        path: options.path,
        context: ({ req, res }) => ({ req, res }),
      };
    },
  });
};
