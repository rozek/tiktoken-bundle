import { Tiktoken } from 'js-tiktoken/lite'
import cl100k_base from './ranks/cl100k_base'

/**** create browser-compatible tokenizer instance with cl100k_base encoding for offline use ****/

  const Tokenizer = new Tiktoken(cl100k_base)

/**** TokensOfText ****/

  export function TokensOfText (Text:string):number[] {
    return (Text == null ? [] : Array.from(Tokenizer.encode(Text)))
  }

/**** TextFromTokens ****/

  export function TextFromTokens (TokenList:number[]):string {
    if ((TokenList == null) || (TokenList.length === 0)) {
      return ''
    } else {
      return Tokenizer.decode(TokenList)
    }
  }

/**** NumberOfTokensInText ****/

  export function NumberOfTokensInText (Text:string):number {
    return (Text == null ? 0 : Tokenizer.encode(Text).length)
  }

/**** TokenizationOfText ****/

  const TokenStringCache:Map<number,string> = new Map()

  export function TokenizationOfText (Text:string):[number, string][] {
    if (Text == null) { return [] }
    
    const TokenIds = Array.from(Tokenizer.encode(Text))
    
    return TokenIds.map((TokenId) => {
      if (! TokenStringCache.has(TokenId)) {
        TokenStringCache.set(TokenId, Tokenizer.decode([TokenId]))
      }
      return [TokenId, TokenStringCache.get(TokenId)!]
    })
  }