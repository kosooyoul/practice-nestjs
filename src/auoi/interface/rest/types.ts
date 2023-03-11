import { Optional } from '@/common/types/native';

type AuoiRestApiResponseClass = { constructor: { name: string } };
export class AuoiRestApiResponseFormat<T> {
  success: boolean;
  code?: Optional<string>;
  message?: Optional<string>;
  data?: Optional<T>;
  dataType?: Optional<string>;
  timestamp?: Optional<number>;
}
export type AuoiRestApiResponse<T> = Promise<AuoiRestApiResponseFormat<T | Error>>;

export const AuoiRestApiResponse = async function <T extends AuoiRestApiResponseClass>(dataOrError: T): Promise<AuoiRestApiResponseFormat<T>> {
  const response = new AuoiRestApiResponseFormat<T>();
  response.success = false;
  response.timestamp = Date.now();

  if (dataOrError instanceof Error) {
    response.code = '40000';
    response.message = dataOrError.message;
    response.data = null;
    response.dataType = null;
  } else {
    response.success = true;
    response.code = '20000';
    response.message = null;
    response.data = dataOrError;
    response.dataType = dataOrError.constructor.name;
  }
  return response;
};
