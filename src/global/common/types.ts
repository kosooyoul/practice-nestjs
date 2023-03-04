import { mongoose } from '@typegoose/typegoose';

export type StringMap = { [key: string]: string };
export type NullableStringMap = { [key: string]: string | null | undefined };
export type StringArrayMap = { [key: string]: string[] };
export type AnyArrayMap = { [key: string]: any[] };
export type NumberMap = { [key: string]: number };
export type BooleanMap = { [key: string]: boolean };
export type AnyMap = { [key: string]: any };
export type Map<T> = { [key: string]: T };

export type Optional<T> = T | null | undefined;
export type Nullable<T> = T | null;
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
