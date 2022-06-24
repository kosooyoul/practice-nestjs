import {
  Validate,
  IsMongoId,
  IsEmail,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidateNested,
  Length,
} from 'class-validator';

@ValidatorConstraint()
class PasswordValidator implements ValidatorConstraintInterface {
  validate(text: string) {
    // 텍스트가 없으면 무효
    if (text == null) return false;

    // const lowerAb = /[a-z]/.test(text)
    // const upperAb = /[A-Z]/.test(text)
    const alphabet = /[a-zA-Z]/.test(text);
    const number = /[0-9]/.test(text);
    const special = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/.test(
      text,
    );
    // const mixed = (lowerAb? 1: 0) + (upperAb? 1: 0) + (number? 1: 0) + (special? 1: 0)
    const mixed = (alphabet ? 1 : 0) + (number ? 1 : 0) + (special ? 1 : 0);

    // 3개 이상 종류 문자 조합이 아닌 경우 무효
    if (mixed < 3) return false;
    // 길이가 8자 이상 15자 이하가 아닌 경우 무효
    if (text.length < 8 || text.length > 15) return false;
    // 모든 조건을 통과하면 유효

    return true;
  }
}

class ClassValidator {
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

const InputValidator = new ClassValidator();

export default InputValidator;
