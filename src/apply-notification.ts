import { JsonRpcNotification, isPromiseLike, Dict } from '@blackglory/types'

export function applyNotification<T>(callables: Dict<Function>, notification: JsonRpcNotification<T>): void | Promise<void> {
  const method = notification.method
  const params = getParams()
  const result = Reflect.apply(Reflect.get(callables, method), callables, params)
  if (isPromiseLike(result)) {
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
