import { ObjectId } from '@/global/infrastructure/mongo/types';
import { TokenType } from '@/global/common/enums';

export interface ISignature {
  id: ObjectId;
  identity: string;
  name: string;
  keep: boolean;
  tokenType: TokenType;
}
