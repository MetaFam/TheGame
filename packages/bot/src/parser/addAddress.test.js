const parseAddAddress = require('./addAddress')

describe('addAddress handler tests', () => {
  test('It should error if a string is not provided', () =>
    expect(() => parseAddAddress(undefined)).toThrow(/type/))

  test('It should error if an empty string is passed in', () =>
    expect(() => parseAddAddress('')).toThrow(/empty/))

  test('It should error if not enough arguments are provided', () =>
    expect(() => parseAddAddress('!ac addaddress')).toThrow(/arguments/))

  test('It should properly pass a well formed message', () =>
    expect(
      parseAddAddress(
        '!ac addaddress 0x960b236A07cf122663c4303350609A66A7B288C0',
      ),
    ).toEqual('0x960b236A07cf122663c4303350609A66A7B288C0'))
})
