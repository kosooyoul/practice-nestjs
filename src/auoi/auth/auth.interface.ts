import { ObjectId } from '@/common/types/mongo';
import { TokenType } from '@/common/enums';

export interface ISignature {
  id: ObjectId;
  identity: string;
  name: string;
  keep: boolean;
  tokenType: TokenType;
}
