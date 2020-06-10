import { JsonRpcNotification, Json, StructuredClone } from 'json-rpc-creator'
import { isPromise } from 'extra-promise'

export function applyNotification<T extends Json | StructuredClone = Json>(obj: object, notification: JsonRpcNotification<T>): void | Promise<void> {
  const method = notification.method
  const params = getParams()
  const result = Reflect.apply(Reflect.get(obj, method), obj, params)
  if (isPromise(result)) {
    return (async () => {
      await result
    })()
  }

  function getParams() {
    if (notification.params) {
      if (Array.isArray(notification.params)) {
        return notification.params
      } else {
        return [notification.params]
      }
    } else {
      return []
    }
  }
}
