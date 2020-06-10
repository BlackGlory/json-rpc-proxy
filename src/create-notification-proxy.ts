import { Json, StructuredClone, JsonRpcNotification, notification } from 'json-rpc-creator'
import { FunctionKeys } from './shared'

type NotificationProxy<T, U extends Json | StructuredClone = Json> = {
  [P in FunctionKeys<T>]:
    T[P] extends (...args: infer V) => unknown
      ? (...args: V) => JsonRpcNotification<U>
      : never
}

export function createNotificationProxy<T extends object, U extends Json | StructuredClone = Json>(obj: T): NotificationProxy<T, U> {
  return new Proxy(obj, {
    get(_: T, prop: string) {
      return (...args: U[]) => notification(prop, args)
    }
  }) as NotificationProxy<T, U>
}
