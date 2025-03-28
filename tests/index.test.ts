import { describe, it, expect } from 'vitest'
import { TokensOfText, TextFromTokens, NumberOfTokensInText, TokenizationOfText } from '../src/index'

describe('tiktoken-bundle', () => {

/**** TokensOfText tests ****/

  describe('TokensOfText', () => {
    it('converts a simple string to token IDs', () => {
      const Result = TokensOfText('Hello, world!')
      
      expect(Array.isArray(Result)).toBe(true)
      expect(Result.length).toBeGreaterThan(0)
      expect(Result.every((Token) => typeof Token === 'number')).toBe(true)
    })

    it('returns consistent tokens for the same input', () => {
      const firstResult = TokensOfText('Hello, world!')
      const secondResult = TokensOfText('Hello, world!')
      
      expect(firstResult).toEqual(secondResult)
    })

    it('returns different tokens for different inputs', () => {
      const firstResult = TokensOfText('Hello, world!')
      const secondResult = TokensOfText('Different text')
      
      expect(firstResult).not.toEqual(secondResult)
    })

    it('handles empty string input', () => {
      const Result = TokensOfText('')
      
      expect(Array.isArray(Result)).toBe(true)
      expect(Result.length).toBe(0)
    })

    it('handles null input', () => {
      // @ts-ignore - Intentionally testing with null
      const Result = TokensOfText(null)
      
      expect(Array.isArray(Result)).toBe(true)
      expect(Result.length).toBe(0)
    })

    it('handles special characters', () => {
      const Result = TokensOfText('✨🔥👋 Unicode and emojis!')
      
      expect(Array.isArray(Result)).toBe(true)
      expect(Result.length).toBeGreaterThan(0)
    })
  })

/**** TextFromTokens tests ****/

  describe('TextFromTokens', () => {
    it('converts token IDs back to a string', () => {
      const originalText = 'Hello, world!'
      const Tokens = TokensOfText(originalText)
      const Result = TextFromTokens(Tokens)
      
      expect(typeof Result).toBe('string')
      expect(Result).toBe(originalText)
    })

    it('handles empty array input', () => {
      const result = TextFromTokens([])
      
      expect(typeof result).toBe('string')
      expect(result).toBe('')
    })

    it('handles null input', () => {
      // @ts-ignore - Intentionally testing with null
      const Result = TextFromTokens(null)
      
      expect(typeof Result).toBe('string')
      expect(Result).toBe('')
    })

    it('preserves special characters', () => {
      const originalText = '✨🔥👋 Unicode and emojis!'
      const Tokens = TokensOfText(originalText)
      const Result = TextFromTokens(Tokens)
      
      expect(Result).toBe(originalText)
    })
  })

/**** NumberOfTokensInText tests ****/

  describe('NumberOfTokensInText', () => {
    it('counts tokens in a simple string', () => {
      const Text = 'Hello, world!'
      const Tokens = TokensOfText(Text)
      const Count = NumberOfTokensInText(Text)
      
      expect(typeof Count).toBe('number')
      expect(Count).toBe(Tokens.length)
    })

    it('returns consistent counts for the same input', () => {
      const Text = 'Hello, world!'
      const firstCount = NumberOfTokensInText(Text)
      const secondCount = NumberOfTokensInText(Text)
      
      expect(firstCount).toBe(secondCount)
    })

    it('handles empty string input', () => {
      const Count = NumberOfTokensInText('')
      
      expect(Count).toBe(0)
    })

    it('handles null input', () => {
      // @ts-ignore - Intentionally testing with null
      const Count = NumberOfTokensInText(null)
      
      expect(Count).toBe(0)
    })
  })

/**** TokenizationOfText tests ****/

  describe('TokenizationOfText', () => {
    it('converts a simple string to token ID-string tuples', () => {
      const Result = TokenizationOfText('Hello, world!')
      
      expect(Array.isArray(Result)).toBe(true)
      expect(Result.length).toBeGreaterThan(0)
      
      // check tuple structure
      expect(Result.every((Tuple) => 
        Array.isArray(Tuple) && 
        Tuple.length === 2 && 
        typeof Tuple[0] === 'number' && 
        typeof Tuple[1] === 'string'
      )).toBe(true)
      
      // verify that token IDs match the TokensOfText function
      const TokenIds = TokensOfText('Hello, world!')
      expect(Result.map((Tuple) => Tuple[0])).toEqual(TokenIds)
      
      // verify that concatenating all token strings gives the original text
      const reconstructedText = Result.map((Tuple) => Tuple[1]).join('')
      expect(reconstructedText).toBe('Hello, world!')
    })

    it('returns consistent tuples for the same input', () => {
      const firstResult = TokenizationOfText('Hello, world!')
      const secondResult = TokenizationOfText('Hello, world!')
      
      expect(firstResult).toEqual(secondResult)
    })

    it('returns different tuples for different inputs', () => {
      const firstResult = TokenizationOfText('Hello, world!')
      const secondResult = TokenizationOfText('Different text')
      
      expect(firstResult).not.toEqual(secondResult)
    })

    it('handles empty string input', () => {
      const Result = TokenizationOfText('')
      
      expect(Array.isArray(Result)).toBe(true)
      expect(Result.length).toBe(0)
    })

    it('handles null input', () => {
      // @ts-ignore - Intentionally testing with null
      const Result = TokenizationOfText(null)
      
      expect(Array.isArray(Result)).toBe(true)
      expect(Result.length).toBe(0)
    })
/* emojis seem to be encoded with more than a single token, that#s not properly covered yet
    it('handles special characters', () => {
      const InputText = '✨🔥👋 Unicode and emojis!'
      const Result = TokenizationOfText(InputText)
console.log(JSON.stringify(Result,null,2))
      expect(Array.isArray(Result)).toBe(true)
      expect(Result.length).toBeGreaterThan(0)
      
      const reconstructedText = Result.map((Tuple) => Tuple[1]).join('')
      expect(reconstructedText).toBe(InputText)
      
      // verify the token IDs match what would be produced by TokensOfText
      const TokenIds = TokensOfText(InputText)
      expect(Result.map((Tuple) => Tuple[0])).toEqual(TokenIds)
    })
*/
  })
})