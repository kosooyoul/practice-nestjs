import { createParamDecorator } from '@nestjs/common';

export interface ISignature {
  id: string;
}

export const Signature = createParamDecorator((...args: any[]) => {
  return { id: '000000000000000000000000' };
});
export const Authorization = createParamDecorator((...args: any[]) => {
  return 'sample-authorization';
});
