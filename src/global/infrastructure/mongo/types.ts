import { mongoose } from '@typegoose/typegoose';
import { Nullable } from '../../common/types/native';

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
