import { applyRequest } from '@src/apply-request'
import { request } from 'json-rpc-creator'
import '@blackglory/jest-matchers'

describe('applyRequest<T extends Json | StructuredClone = Json>(obj: any, request: JsonRpcRequest<T>): JsonRpcSuccess<T> | Promise<JsonRpcSuccess<T>>', () => {
  describe('async method', () => {
    describe('request.params doesnt exist', () => {
      it('return Promise<JsonRpcSuccess>', async () => {
        const fn = jest.fn().mockResolvedValue('hello world')
        const obj = { hello: fn }
        const req = request(0, 'hello')

        const result = applyRequest(obj, req)
        const proResult = await result

        expect(result).toBePromise()
        expect(obj.hello).toBeCalledTimes(1)
        expect(proResult).toStrictEqual({
          jsonrpc: '2.0'
        , id: 0
        , result: 'hello world'
        })
      })
    })

    describe('request.params by-position', () => {
      it('return Promise<JsonRpcSuccess>', async () => {
        const fn = jest.fn().mockImplementation(async (who: string) => `hello ${who}`)
        const obj = { hello: fn }
        const req = request(0, 'hello', ['world'])

        const result = applyRequest(obj, req)
        const proResult = await result

        expect(result).toBePromise()
        expect(obj.hello).toBeCalledTimes(1)
        expect(proResult).toStrictEqual({
          jsonrpc: '2.0'
        , id: 0
        , result: 'hello world'
        })
      })
    })

    describe('request.params by-name', () => {
      it('return Promise<JsonRpcSuccess>', async () => {
        const fn = jest.fn().mockImplementation(async ({ who }: { who: string }) => `hello ${who}`)
        const obj = { hello: fn }
        const req = request(0, 'hello', { who: 'world' })

        const result = applyRequest(obj, req)
        const proResult = await result

        expect(result).toBePromise()
        expect(obj.hello).toBeCalledTimes(1)
        expect(proResult).toStrictEqual({
          jsonrpc: '2.0'
        , id: 0
        , result: 'hello world'
        })
      })
    })
  })

  describe('sync method', () => {
    describe('request.params doesnt exist', () => {
      it('return JsonRpcSuccess', async () => {
        const fn = jest.fn().mockReturnValue('hello world')
        const obj = { hello: fn }
        const req = request(0, 'hello')

        const result = applyRequest(obj, req)

        expect(obj.hello).toBeCalledTimes(1)
        expect(result).toStrictEqual({
          jsonrpc: '2.0'
        , id: 0
        , result: 'hello world'
        })
      })
    })

    describe('request.params by-position', () => {
      it('return JsonRpcSuccess', () => {
        const fn = jest.fn().mockImplementation((who: string) => `hello ${who}`)
        const obj = { hello: fn }
        const req = request(0, 'hello', ['world'])

        const result = applyRequest(obj, req)

        expect(obj.hello).toBeCalledTimes(1)
        expect(result).toStrictEqual({
          jsonrpc: '2.0'
        , id: 0
        , result: 'hello world'
        })
      })
    })

    describe('request.params by-name', () => {
      it('return JsonRpcSuccess', () => {
        const fn = jest.fn().mockImplementation(({ who }: { who: string }) => `hello ${who}`)
        const obj = { hello: fn }
        const req = request(0, 'hello', { who: 'world' })

        const result = applyRequest(obj, req)

        expect(obj.hello).toBeCalledTimes(1)
        expect(result).toStrictEqual({
          jsonrpc: '2.0'
        , id: 0
        , result: 'hello world'
        })
      })
    })
  })
})
