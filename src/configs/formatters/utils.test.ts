import { expect, test, describe } from 'vitest'
import { getTokensColors } from './utils'

describe('getTokensColors', () => {
  test('should return an empty list for an invalid token', () => {
    expect(getTokensColors({})).toEqual([])
  })
})
