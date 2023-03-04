import { ObjectId } from '@/global/common/types';

export interface IAccountFilter {
  _id?: ObjectId;
  email?: string;
  username?: string;
}
