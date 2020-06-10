import { success, JsonRpcRequest, Json, StructuredClone, JsonRpcSuccess } from 'json-rpc-creator'
import { isPromise } from 'extra-promise'

export function applyRequest<T extends Json | StructuredClone>(obj: object, request: JsonRpcRequest<T>): JsonRpcSuccess<T> | Promise<JsonRpcSuccess<T>> {
  const method = request.method
  const params = getParams()
  const result = Reflect.apply(Reflect.get(obj, method), obj, params)
  if (isPromise<T>(result)) {
    return (async () => success(request.id, await result))()
  } else {
    return success(request.id, result)
  }

  function getParams() {
    if (request.params) {
      if (Array.isArray(request.params)) {
        return request.params
      } else {
        return [request.params]
      }
    } else {
      return []
    }
  }
}
