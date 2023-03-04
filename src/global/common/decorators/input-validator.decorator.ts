import {
  Validate,
  IsMongoId,
  IsEmail,
  ValidateNested,
  Length,
} from 'class-validator';
import { PasswordValidator } from './validators/password.validator';

class GlobalInputValidatorPrototype {
  IsMongoId(message?: string): PropertyDecorator {
    return IsMongoId({
      message: message || 'INPUT_MONGO_ID_IS_NOT_VALID',
    });
  }

  IsEmail(message?: string): PropertyDecorator {
    return IsEmail({}, { message: message || 'INPUT_EMAIL_IS_NOT_VALID }' });
  }

  IsPassword(message?: string): PropertyDecorator {
    return Validate(PasswordValidator, {
      message: message || 'INPUT_PASSWORD_IS_NOT_VALID',
    });
  }

  IsUserName(message?: string): PropertyDecorator {
    return Length(2, 20, {
      message: message || 'INPUT_USER_NAME_IS_NOT_VALID',
    });
  }

  IsNotEmptyString(message?: string): PropertyDecorator {
    return Length(1, 10000, {
      message: message || 'INPUT_STRING_IS_EMPTY',
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ValidateNestedArray(_classType: any): PropertyDecorator {
    return ValidateNested({ each: true });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ValidateNestedObject(_classType: any): PropertyDecorator {
    return ValidateNested({});
  }
}

export const GlobalInputValidator = new GlobalInputValidatorPrototype();
