expect.extend({
  toBePromise(received: unknown) {
    if (isPromise(received)) {
      return {
        message: () => `expected ${received} not to be a Promise`
      , pass: true
      }
    } else {
      return {
        message: () => `expected ${received} to be a Promise`
      , pass: false
      }
    }
  }
})

declare global {
  namespace jest {
    interface Matchers<R> {
      toBePromise(): R
    }
  }
}

function isPromise<T>(val: any): val is Promise<T> {
  return val instanceof Promise
}

export {} // fuck tsc
