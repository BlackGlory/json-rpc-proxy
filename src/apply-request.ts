import { isPromiseLike, JsonRpcRequest, JsonRpcSuccess, Dict } from '@blackglory/types'
import { success } from 'json-rpc-creator'

export function applyRequest<T>(callables: Dict<Function>, request: JsonRpcRequest<T>): JsonRpcSuccess<T> | Promise<JsonRpcSuccess<T>> {
  const method = request.method
  const params = getParams()
  const result = Reflect.apply(Reflect.get(callables, method), callables, params)
  if (isPromiseLike<T>(result)) {
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
