import { JsonRpcRequest, JsonRpcNotification } from '@blackglory/types'

export function getParams<T>(jsonRpc: JsonRpcRequest<T> | JsonRpcNotification<T>) {
  if (jsonRpc.params) {
    if (Array.isArray(jsonRpc.params)) {
      return jsonRpc.params
    } else {
      return [jsonRpc.params]
    }
  } else {
    return []
  }
}
