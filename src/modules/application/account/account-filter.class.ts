import { ObjectId } from '@/common/types';

export class AccountFilter {
  _id?: ObjectId;
  email?: string;
  username?: string;
}
