import { Optional } from '@/common/types/native';

export default class AuoiDecoratorUtils {
  static combinePropertyDecorator(...decorators: PropertyDecorator[]): PropertyDecorator {
    return function (target: any, key: string) {
      let decorator: Optional<PropertyDecorator>;
      while ((decorator = decorators.shift())) decorator(target, key);
    } as PropertyDecorator;
  }

  static combineMethodDecorator(...decorators: MethodDecorator[]): MethodDecorator {
    return function (target: any, key: string, descriptor: any) {
      let decorator: Optional<MethodDecorator>;
      while ((decorator = decorators.shift())) decorator(target, key, descriptor);
    } as MethodDecorator;
  }
}
