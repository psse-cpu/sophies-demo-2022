export class TypeormLoaderMiddleware {}

export type KeyFunction = (parent: any) => any | any[] | undefined

export interface TypeormLoaderOptions {
  selfKey?: boolean
}

export function TypeormLoaderExtension(
  _keyFunction: KeyFunction,
  _options?: TypeormLoaderOptions
): MethodDecorator & PropertyDecorator {
  /*
    eslint-disable-next-line @typescript-eslint/ban-types -- just copied signature
     from @webundsoehne/nestjs-graphql-typeorm-dataloader
  */
  return (_target: Function | object, _key: string | symbol): void => {
    /* it's a shim Mr. ESLint, so noisy */
  }
}
