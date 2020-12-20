import { isFunction, JsonRpcNotification } from '@blackglory/types'
import { getParams } from './shared'

export async function applyNotification<T>(
  callables: object
, notification: JsonRpcNotification<T>
): Promise<void> {
  const fn = Reflect.get(callables, notification.method)
  if (isFunction(fn)) {
    try {
      await Reflect.apply(fn, callables, getParams(notification))
    } catch {}
  }
}
