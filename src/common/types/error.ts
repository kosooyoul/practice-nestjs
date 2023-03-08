import { IMultiLanguageString, selectLanguage, SupportedLanguage } from './multi-language';
import { Map, Nullable } from './native';

export class MultiLanguageError extends Error {
  private static messages: Map<IMultiLanguageString> = {};

  code!: string;

  constructor(code: string) {
    super();
    this.code = code;
  }

  getMessage(language?: SupportedLanguage): Nullable<string> {
    return selectLanguage(MultiLanguageError.messages[this.code], language) || selectLanguage(MultiLanguageError.messages[this.code], 'en');
  }

  static registerMessages(messages: Map<string>, language: SupportedLanguage): void {
    for (const code in messages) {
      this.messages[code] = { ...this.messages[code], [language]: messages[code] };
    }
  }

  static getMessage(code: string, language?: SupportedLanguage): Nullable<string> {
    return selectLanguage(MultiLanguageError.messages[code], language) || selectLanguage(MultiLanguageError.messages[code], 'en');
  }
}
