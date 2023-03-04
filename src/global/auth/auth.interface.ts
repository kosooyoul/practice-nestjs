import { ObjectId } from '@/global/common/types';
import { TokenType } from '@/global/common/enums';

export interface ISignature {
  id: ObjectId;
  identity: string;
  name: string;
  keep: boolean;
  tokenType: TokenType;
}
