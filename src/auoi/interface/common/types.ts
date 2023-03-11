export interface IAuoiApiPropertyOptions {
  type: any;
  description?: string;
  nullable?: boolean;
  defaultValue?: any;
  example?: any;
}

export const getReturnTypeFunc = (returnType: any) => () => returnType;
