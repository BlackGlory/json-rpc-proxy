import { test, expect } from 'vitest'
import * as target from '@src/index.js'

test('exports', () => {
  const expected = [
    'createRequestProxy'
  , 'createNotificationProxy'
  , 'applyRequest'
  , 'applyNotification'
  ].sort()

  const exports = Object.keys(target).sort()

  expect(exports).toEqual(expected)
})
