import { ObjectId } from '@/common/types/mongo';

export interface IAccountFilter {
  _id?: ObjectId;
  email?: string;
  username?: string;
}
