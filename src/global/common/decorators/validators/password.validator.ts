import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class PasswordValidator implements ValidatorConstraintInterface {
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
