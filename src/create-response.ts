import {
  JsonRpc2Request
, JsonTypes
, JsonRpc2Response
, JsonRpc2SuccessResponse
, JsonRpc2Error
, success
, error
} from 'json-rpc-creator'

export function createResponse(request: JsonRpc2Request, result: JsonTypes): JsonRpc2SuccessResponse
export function createResponse(request: JsonRpc2Request, handler: (request: JsonRpc2Request) => JsonTypes): JsonRpc2SuccessResponse
export function createResponse(request: JsonRpc2Request, handler: (request: JsonRpc2Request) => JsonTypes, errorHandler: (error: any) => JsonRpc2Error): JsonRpc2Response
export function createResponse(request: JsonRpc2Request, resultOrHandler: JsonTypes | ((request: JsonRpc2Request) => JsonTypes), errorHandler?: (error: any) => JsonRpc2Error) {
  if (typeof resultOrHandler === 'function') {
    const handler = resultOrHandler as (request: JsonRpc2Request) => JsonTypes
    if (typeof errorHandler === 'function') {
      try {
        return success(request.id, handler(request))
      } catch (e) {
        return error(request.id, errorHandler(e))
      }
    } else {
      return success(request.id, handler(request))
    }
  } else {
    const result = resultOrHandler as JsonTypes
    return success(request.id, result)
  }
}
