import { applyNotification } from '@src/apply-notification'
import { notification } from 'json-rpc-creator'
import '@blackglory/jest-matchers'

describe('applyNotification<T>(callables: Dict<Function>, notification: JsonRpcNotification<T>): Promise<void>', () => {
  describe('method not found', () => {
    it('return Promise<void>', async () => {
      const callables = {}
      const req = notification('fn')

      const result = applyNotification(callables, req)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeUndefined()
    })
  })

  describe('method throws error', () => {
    it('return Promise<void>', async () => {
      const fn = jest.fn().mockRejectedValue(new Error('message'))
      const callables = { fn }
      const req = notification('fn')

      const result = applyNotification(callables, req)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeUndefined()
    })
  })

  describe('request.params doesnt exist', () => {
    it('return Promise<void>', async () => {
      const fn = jest.fn().mockResolvedValue(undefined)
      const callables = { fn }
      const notice = notification('fn')

      const result = applyNotification(callables, notice)
      const proResult = await result

      expect(result).toBePromise()
      expect(fn).toBeCalledTimes(1)
      expect(fn).toBeCalledWith()
      expect(proResult).toBeUndefined()
    })
  })

  describe('notification.params by-position', () => {
    it('return Promise<void>', async () => {
      const fn = jest.fn().mockResolvedValue(undefined)
      const callables = { hello: fn }
      const notice = notification('hello', ['world'])

      const result = applyNotification(callables, notice)
      const proResult = await result

      expect(result).toBePromise()
      expect(fn).toBeCalledTimes(1)
      expect(fn).toBeCalledWith('world')
      expect(proResult).toBeUndefined()
    })
  })

  describe('notification.params by-name', () => {
    it('return Promise<void>', async () => {
      const fn = jest.fn().mockResolvedValue(undefined)
      const callables = { hello: fn }
      const notice = notification('hello', { who: 'world' })

      const result = applyNotification(callables, notice)
      const proResult = await result

      expect(result).toBePromise()
      expect(fn).toBeCalledTimes(1)
      expect(fn).toBeCalledWith({ who: 'world' })
      expect(proResult).toBeUndefined()
    })
  })
})
