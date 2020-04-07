import { GameState, CardSource } from './models/GameState'
import { ThunkAction } from 'redux-thunk'


export type RequestInitializePayload = {}
export type ReceiveInitializePayload = { cardSources: Array<CardSource>, cards: Array<number> }
export type GuessPayload = { timestamp: number, card: number }


export type GameAction
  = { type: 'REQUEST_INITIALIZE', payload: RequestInitializePayload }
  | { type: 'RECEIVE_INITIALIZE', payload: ReceiveInitializePayload }
  | { type: 'BEGIN_GUESS', payload: GuessPayload }
  | { type: 'END_GUESS', payload: GuessPayload }


const preloadImage = (src: CardSource): Promise<null> => {
  return new Promise(resolve => {
    const img = document.createElement('img')
    img.setAttribute('src', src.url)
    img.addEventListener('load', () => resolve(null))
  })
}


export function initialize(): ThunkAction<void, GameState, unknown, GameAction> {
  return async dispatch => {
    dispatch({ type: 'REQUEST_INITIALIZE', payload: {} })

    await fetch('https://dog.ceo/api/breeds/image/random/8/alt')
      .then(response => response.json())
      .then(async data => {
        const cardSources: Array<CardSource> = data
          .message
          .map(({ url, altText }: { url: string, altText: string }) =>
            ({ url, name: altText.substr(0, altText.length - 4) }))
        await Promise.all(cardSources.map(preloadImage))

        let cards: Array<number> = []
        for (let i = 0; i < 8; ++i) {
          cards.push(i)
          cards.push(i)
        }

        for (let t = 0; t < 2; ++t) {
          for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
          }
        }

        const payload = { cardSources, cards }
        dispatch({ type: 'RECEIVE_INITIALIZE', payload })
      })
  }
}


export function beginGuess(card: number): GameAction {
  const payload: GuessPayload = {
    timestamp: new Date().getTime(),
    card,
  }

  return { type: 'BEGIN_GUESS', payload }
}


export function endGuess(card: number): GameAction {
  const payload: GuessPayload = {
    timestamp: new Date().getTime(),
    card,
  }

  return { type: 'END_GUESS', payload }
}
