import { AuoiError } from './types/error';

export enum GlobalErrorCodes {
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  SUCCESS = 'SUCCESS',

}

AuoiError.registerMessages(
  {
    [GlobalErrorCodes.UNKNOWN_ERROR]: '알 수 없는 에러가 발생하였습니다.',
    [GlobalErrorCodes.SUCCESS]: '요청이 성공하였습니다.',
  },
  'ko',
);

AuoiError.registerMessages(
  {
    [GlobalErrorCodes.UNKNOWN_ERROR]: 'An unknown error has occurred.',
    [GlobalErrorCodes.SUCCESS]: 'Your request was successful.',
  },
  'en',
);

AuoiError.registerMessages(
  {
    [GlobalErrorCodes.UNKNOWN_ERROR]: '不明なエラーが発生しました。',
    [GlobalErrorCodes.SUCCESS]: 'リクエストが成功しました。',
  },
  'ja',
);
