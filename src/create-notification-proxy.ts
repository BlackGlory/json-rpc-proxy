import { JsonRpcNotification } from '@blackglory/types'
import { notification } from 'json-rpc-creator'

type NotificationProxy<T, U> = {
  [P in FunctionKeys<T>]:
    T[P] extends (...args: infer V) => unknown
      ? (...args: V) => JsonRpcNotification<U>
      : never
}

export function createNotificationProxy<T extends object, U = unknown>(): NotificationProxy<T, U> {
  return new Proxy(Object.create({}), {
    get(_, prop: string) {
      return (...args: U[]) => notification(prop, args)
    }
  }) as NotificationProxy<T, U>
}
