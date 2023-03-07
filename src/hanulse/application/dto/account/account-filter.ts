import { ObjectId } from '@/global/infrastructure/mongo/types';

export interface IAccountFilter {
  _id?: ObjectId;
  email?: string;
  username?: string;
}
