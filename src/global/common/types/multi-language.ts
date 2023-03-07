import { Nullable } from './native';

export interface IMultiLanguageString {
  ko?: string;
  en?: string;
  ja?: string;
  zh?: string;
  vi?: string;
}

export type SupportedLanguage = keyof IMultiLanguageString;
export const supportedLanguages: SupportedLanguage[] = ['ko', 'en', 'ja', 'zh', 'vi'];

export function selectLanguage(multiLanguageString?: IMultiLanguageString, acceptLanguage: SupportedLanguage = 'en'): Nullable<string> {
  if (multiLanguageString == null) {
    return null;
  }
  return multiLanguageString[acceptLanguage];
}
