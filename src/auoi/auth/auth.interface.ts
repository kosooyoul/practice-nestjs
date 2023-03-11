import { TokenType } from '@/common/enums';

export interface ISignature {
  id: string;
  identity: string;
  name: string;
  keep: boolean;
  tokenType: TokenType;
}
