import { mongoose } from '@typegoose/typegoose';
import { Nullable, Optional } from './types/native';

export type MongoDBMatches = any;

export const ObjectId = function (objectIdString: string): ObjectId {
  return new mongoose.Types.ObjectId(objectIdString);
};
export const NullableObjectId = function (objectIdString: Nullable<string>): Nullable<ObjectId> {
  if (objectIdString == null) {
    return null;
  }
  return new mongoose.Types.ObjectId(objectIdString);
};
export type ObjectId = mongoose.Types.ObjectId;

type ApiResponseClass = { constructor: { name: string } };
export class ApiResponseFormat<T> {
  success: boolean;
  code?: Optional<string>;
  message?: Optional<string>;
  data?: Optional<T>;
  dataType?: Optional<string>;
  timestamp?: Optional<number>;
}
export type ApiResponse<T> = Promise<ApiResponseFormat<T | Error>>;

export const ApiResponse = async function <T extends ApiResponseClass>(dataOrError: T): Promise<ApiResponseFormat<T>> {
  const response = new ApiResponseFormat<T>();
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
