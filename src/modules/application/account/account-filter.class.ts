import { ObjectId } from '@/global/common/types';

export class AccountFilter {
  _id?: ObjectId;
  email?: string;
  username?: string;
}
