import { createResponse } from '../src/create-response'

describe('createResponse', () => {
  test('createResponse(request)', () => {
    expect(createResponse({
      jsonrpc: '2.0'
    , id: 0
    , method: 'hello'
    , params: ['world']
    }, 'goodbye'))
      .toStrictEqual({
        jsonrpc: '2.0'
      , id: 0
      , result: 'goodbye'
      })
  })

  test('createResponse(request, handler)', () => {
    expect(createResponse(
      {
        jsonrpc: '2.0'
      , id: 0
      , method: 'hello'
      , params: ['world']
      }
    , () => 'goodbye')
    )
      .toStrictEqual({
        jsonrpc: '2.0'
      , id: 0
      , result: 'goodbye'
      })
  })

  test('createResponse(request, handler, errorHandler)', () => {
    expect(createResponse(
      {
        jsonrpc: '2.0'
      , id: 0
      , method: 'hello'
      , params: ['world']
      }
    , () => {
        throw [404, new Error('Not found')]
      }
    , ([code, { message }]) => ({ code, message })
    ))
      .toStrictEqual({
        jsonrpc: '2.0'
      , id: 0
      , error: {
          code: 404
        , message: 'Not found'
        }
      })
  })
})
