import { createCall } from '../src/create-call'

test('createCall(target)', () => {
  const target = {
    hello(who: string) {
      return who
    }
  , bye() {
      return 'bye'
    }
  , exit(code: number) {
      return code
    }
  }

  const call = createCall(target)

  expect(call({
    jsonrpc: '2.0'
  , method: 'hello'
  , params: 'world'
  })).toEqual('world')

  expect(call({
    jsonrpc: '2.0'
  , method: 'bye'
  })).toEqual('bye')

  expect(call({
    jsonrpc: '2.0'
  , method: 'exit'
  , params: [0]
  })).toEqual(0)
})
