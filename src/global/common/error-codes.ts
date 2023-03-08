import { MultiLanguageError } from '@/common/types/error';

export enum AuoiErrorCodes {
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  SUCCESS = 'SUCCESS',
}

MultiLanguageError.registerMessages(
  {
    [AuoiErrorCodes.UNKNOWN_ERROR]: '알 수 없는 에러가 발생하였습니다.',
    [AuoiErrorCodes.SUCCESS]: '요청이 성공하였습니다.',
  },
  'ko',
);

MultiLanguageError.registerMessages(
  {
    [AuoiErrorCodes.UNKNOWN_ERROR]: 'An unknown error has occurred.',
    [AuoiErrorCodes.SUCCESS]: 'Your request was successful.',
  },
  'en',
);

MultiLanguageError.registerMessages(
  {
    [AuoiErrorCodes.UNKNOWN_ERROR]: '不明なエラーが発生しました。',
    [AuoiErrorCodes.SUCCESS]: 'リクエストが成功しました。',
  },
  'ja',
);
