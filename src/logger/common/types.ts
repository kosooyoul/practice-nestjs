import { Optional } from '@/global/common/types/native';

export interface IHttpLog {
  processor: string;
  processorUptime: number;
  method: string;
  endpoint: string;
  type?: Optional<'GraphQL' | 'RestApi'>;
  operation?: Optional<string>;
  query?: Optional<string>;
  variables?: Optional<any>;
  result?: Optional<any>;
  error?: Optional<any>;
  resultSize?: Optional<number>;
  authToken?: Optional<string>;
  signature?: Optional<any>;
  clientIp?: Optional<string>;
  referer?: Optional<string>;
  language?: Optional<string>;
  userAgent?: Optional<string>;
  elapsed?: Optional<number>;
  startedAt: Date;
  finishedAt?: Optional<Date>;
}
