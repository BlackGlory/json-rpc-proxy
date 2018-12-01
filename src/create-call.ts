import { JsonRpc2Notification, JsonRpc2Request } from 'json-rpc-creator'

export function createCall(target: any) {
  return (notificationOrRequest: JsonRpc2Notification | JsonRpc2Request) => {
    if ('params' in notificationOrRequest) {
      return Reflect.apply(target[notificationOrRequest.method], target, Array.isArray(notificationOrRequest.params) ? notificationOrRequest.params : [notificationOrRequest.params])
    } else {
      return Reflect.apply(target[notificationOrRequest.method], target, [])
    }
  }
}
