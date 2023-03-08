import { AuoiConfig } from '@/global/config/config';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { DynamicModule } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GraphQLModule, GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError, GraphQLSchema, printSchema } from 'graphql';
import { AuoiErrorCodes } from '@/global/common/error-codes';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import AuoiStringUtils from '@/global/common/utils/string.utils';

export interface IAuoiGraphQLOptions {
  path: string;
  module: any;
  imports?: any[];
  providers?: any[];
  resolvers: any[];
}

export class AuoiGraphQLModule {
  public static forRootAsync(options: IAuoiGraphQLOptions): DynamicModule {
    return GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [this.getSchemaModule(options)],
      useFactory: async (): Promise<Omit<ApolloDriverConfig, 'driver'>> => {
        const schema = await this.generateGraphQLSchema(options.resolvers);
        const filepath = this.saveTempTextFile(printSchema(schema));

        return {
          cors: true,
          playground: AuoiConfig.PLAYGROUND_ENABLED,
          introspection: AuoiConfig.PLAYGROUND_ENABLED,
          debug: AuoiConfig.PLAYGROUND_ENABLED,
          autoSchemaFile: false,
          typePaths: [filepath],
          // schema: schema,
          formatError: (error: GraphQLError): GraphQLFormattedError => {
            const originalError = error.originalError;
            if (originalError) {
              return {
                message: originalError.message,
                extensions: { code: AuoiErrorCodes.UNKNOWN_ERROR },
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
  }

  private static getSchemaModule(options: IAuoiGraphQLOptions): DynamicModule {
    return {
      module: options.module,
      imports: options.imports || [],
      providers: [...options.providers, ...(options.resolvers || [])],
    };
  }

  private static async generateGraphQLSchema(resolvers: any[]): Promise<GraphQLSchema> {
    const app = await NestFactory.create(GraphQLSchemaBuilderModule);
    await app.init();

    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create(resolvers);

    return schema;
  }

  private static saveTempTextFile(text: string): string {
    const hash = AuoiStringUtils.hashObject(text);
    const filepath = join(process.cwd(), `/.temp/${hash}`);

    if (existsSync(filepath) == false) {
      mkdirSync(join(process.cwd(), '/.temp/'), { recursive: true });
      writeFileSync(filepath, text);
    }

    return filepath;
  }
}
