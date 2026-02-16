import { isFunction, pass } from '@blackglory/prelude'
import { JsonRpcNotification } from 'json-rpc-types'
import { getParamsAsArray } from './utils.js'

export async function applyNotification<T>(
  callables: object
, notification: JsonRpcNotification<T>
): Promise<void> {
  const fn = Reflect.get(callables, notification.method)
  if (isFunction(fn)) {
    try {
      await Reflect.apply(fn, callables, getParamsAsArray(notification))
    } catch {
      pass()
    }
  }
}
