import { Json, StructuredClone, JsonRpcRequest, request } from 'json-rpc-creator'
import { FunctionKeys } from './shared'

type RequestProxy<T, U extends Json | StructuredClone> = {
  [P in FunctionKeys<T>]:
    T[P] extends (...args: infer V) => unknown
      ? (...args: V) => JsonRpcRequest<U>
      : never
}

export function createRequestProxy<T extends object, U extends Json | StructuredClone = Json>(createId: () => string): RequestProxy<T, U> {
  return new Proxy(Object.create(null), {
    get(_: T, prop: string) {
      return (...args: U[]) => request(createId(), prop, args)
    }
  }) as RequestProxy<T, U>
}
