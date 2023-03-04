import { GlobalConfig } from '@/global/config/config';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { DynamicModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { GlobalErrorCodes } from '../../common/error-codes';

export const DefaultGraphQLModule = (
  path: string,
  includeModule?: any,
): DynamicModule => {
  return GraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    imports: [],
    useFactory: () => ({
      uploads: false,
      cors: true,
      validate: true,
      playground: GlobalConfig.PLAYGROUND_ENABLED,
      autoSchemaFile: true,
      // typePaths: ['**/graphql.graphql'],
      debug: true,
      // introspection: false,
      formatError: (error: GraphQLError): GraphQLFormattedError => {
        const originalError = error.originalError;
        if (originalError) {
          return {
            message: originalError.message,
            extensions: { code: GlobalErrorCodes.UNKNOWN_ERROR },
          };
        }
      },
      include: includeModule ? [includeModule] : [],
      disableHealthCheck: true,
      path: path,
      context: ({ req, res }) => ({ req, res }),
    }),
  });
};
