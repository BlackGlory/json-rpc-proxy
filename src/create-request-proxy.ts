import {
  JsonRpc2Id
, JsonRpc2Params
, request
, notification
} from 'json-rpc-creator'

function bakeProxy<T>(methodInjector: (method: string) => T) {
  return new Proxy(Object.create(null), {
    get(_, method) {
      if (typeof method === 'string') {
        return methodInjector(method)
      } else {
        throw new TypeError('method should be string')
      }
    }
  })
}

export function createRequestProxy(): any
export function createRequestProxy(idCreator: () => JsonRpc2Id): any
export function createRequestProxy(idIterator: Iterator<JsonRpc2Id>): any
export function createRequestProxy(idCreatorOrIdIterator?: (() => JsonRpc2Id) | Iterator<JsonRpc2Id>) {
  if (idCreatorOrIdIterator === undefined) {
    return bakeProxy((method: string) => (...params: JsonRpc2Params[]) => notification(method, params))
  } else {
    if (typeof idCreatorOrIdIterator === 'function') {
      return bakeProxy((method: string) => (...params: JsonRpc2Params[]) => {
        const idCreator = idCreatorOrIdIterator as () => JsonRpc2Id
        return request(idCreator(), method, params)
      })
    } else {
      return bakeProxy((method: string) => (...params: JsonRpc2Params[]) => {
        const idIterator = idCreatorOrIdIterator as Iterator<JsonRpc2Id>
        const { done, value } = idIterator.next()
        if (done) {
          throw new Error('iterator is exhausted.')
        } else {
          return request(value, method, params)
        }
      })
    }
  }
}
