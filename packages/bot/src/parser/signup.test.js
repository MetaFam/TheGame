const parseSignup = require('./signup')

const discordId = '123456789098765432'

describe('signup parameters parser 📝', () => {
  const author = { id: discordId }
  
  test('It errors on empty strings', () =>
    expect(() => parseSignup({ content: '', author })).toThrow(/empty/))

  test('It throws if no arguments are provided', () =>
    expect(() => parseSignup({ content: '!ac signup', author })).toThrow(/arguments/))

  test('It throws if it receives undefined as discordId', () =>
    expect(() => parseSignup({ content: '!ac signup foo/123', author: {} })).toThrow(/no Discord ID/))

  test('It properly parses and returns the parameters for signup', () =>
    expect(parseSignup({ content: '!ac signup github/foo', author })).toEqual(['github/foo', `discord/${discordId}`]))
})
