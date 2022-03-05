import { JsonRpcRequest, JsonRpcNotification } from 'json-rpc-types'
import { isArray } from '@blackglory/types'

export function getParamsAsArray<T>(
  jsonRpc: JsonRpcRequest<T> | JsonRpcNotification<T>
): T[] | [Record<string, T>] {
  if (jsonRpc.params) {
    if (isArray(jsonRpc.params)) {
      return jsonRpc.params
    } else {
      return [jsonRpc.params]
    }
  } else {
    return []
  }
}
