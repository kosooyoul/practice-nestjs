import { Transform, Type } from 'class-transformer';

class ClassTransformer {
  Trim(): PropertyDecorator {
    return Transform(({ value }) => value && value.trim());
  }

  TrimArray(): PropertyDecorator {
    return Transform(
      ({ value }) =>
        (value &&
          value.forEach((v, i, arr) => {
            arr[i] = arr[i] && arr[i].trim();
          })) ||
        value,
    );
  }

  NormalizeEmail(): PropertyDecorator {
    return Transform(({ value }) => value && value.trim());
  }

  TransformNestedObject(classType: any): PropertyDecorator {
    return Type(() => classType);
  }

  TransformNestedArray(classType: any): PropertyDecorator {
    return Type(() => classType);
  }
}

const InputTransformer = new ClassTransformer();

export default InputTransformer;
