import { JsonRpcRequest } from 'json-rpc-types'
import { request } from 'json-rpc-creator'
import { FunctionKeys } from 'hotypes'

type RequestProxy<T extends object, U> = {
  [P in FunctionKeys<T>]:
    T[P] extends (...args: infer V) => unknown
      ? (...args: V) => JsonRpcRequest<U>
      : never
}

export function createRequestProxy<T extends object, U = unknown>(
  createId: () => string
): RequestProxy<T, U> {
  return new Proxy(Object.create(null), {
    get(_: T, prop: string) {
      if (['then'].includes(prop)) return
      return (...args: unknown[]) => request(createId(), prop, args)
    }
  }) as RequestProxy<T, U>
}
