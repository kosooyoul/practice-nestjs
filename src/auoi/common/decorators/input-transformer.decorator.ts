import { Transform, Type } from 'class-transformer';

class AuoiInputTransformerPrototype {
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

export const AuoiInputTransformer = new AuoiInputTransformerPrototype();
