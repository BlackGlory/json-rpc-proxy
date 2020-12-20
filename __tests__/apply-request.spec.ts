import { applyRequest } from '@src/apply-request'
import { request } from 'json-rpc-creator'
import '@blackglory/jest-matchers'

describe('applyRequest<T>(callables: Dict<Function>, request: JsonRpcRequest<T>): Promise<JsonRpcResponse<T>>', () => {
  describe('method not found', () => {
    it('return JsonRpcError', async () => {
      const callables = {}
      const req = request(0, 'fn')

      const result = applyRequest(callables, req)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toStrictEqual({
        jsonrpc: '2.0'
      , id: 0
      , error: {
          code: -32601
        , message: 'The method does not exist / is not available.'
        }
      })
    })
  })

  describe('method throws error', () => {
    it('return JsonRpcError', async () => {
      const fn = jest.fn().mockRejectedValue(new Error('message'))
      const callables = { fn }
      const req = request(0, 'fn')

      const result = applyRequest(callables, req)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toStrictEqual({
        jsonrpc: '2.0'
      , id: 0
      , error: {
          code: -32000
        , message: 'Error: message'
        }
      })
    })
  })

  describe('request.params doesnt exist', () => {
    it('return Promise<JsonRpcResponse>', async () => {
      const fn = jest.fn().mockResolvedValue('hello world')
      const callables = { fn }
      const req = request(0, 'fn')

      const result = applyRequest(callables, req)
      const proResult = await result

      expect(result).toBePromise()
      expect(fn).toBeCalledTimes(1)
      expect(proResult).toStrictEqual({
        jsonrpc: '2.0'
      , id: 0
      , result: 'hello world'
      })
    })
  })

  describe('request.params by-position', () => {
    it('return Promise<JsonRpcResponse>', async () => {
      const fn = jest.fn().mockImplementation(async (message: string) => message)
      const callables = { fn }
      const req = request(0, 'fn', ['message'])

      const result = applyRequest(callables, req)
      const proResult = await result

      expect(result).toBePromise()
      expect(fn).toBeCalledTimes(1)
      expect(proResult).toStrictEqual({
        jsonrpc: '2.0'
      , id: 0
      , result: 'message'
      })
    })
  })

  describe('request.params by-name', () => {
    it('return Promise<JsonRpcResponse>', async () => {
      const fn = jest.fn().mockImplementation(async ({ message }: { message: string }) => message)
      const callables = { fn }
      const req = request(0, 'fn', { message: 'hello world' })

      const result = applyRequest(callables, req)
      const proResult = await result

      expect(result).toBePromise()
      expect(fn).toBeCalledTimes(1)
      expect(proResult).toStrictEqual({
        jsonrpc: '2.0'
      , id: 0
      , result: 'hello world'
      })
    })
  })
})
