import { GameState, CardState } from "./game/models/GameState";
import { GameAction } from "./game/GameAction";

const DEFAULT_STATE: GameState = new GameState()

export default function rootReducer(
  state: GameState = DEFAULT_STATE,
  action: GameAction,
): GameState {
  switch (action.type) {
    case 'REQUEST_INITIALIZE': {
      let newState = state.clone()
      newState.state = { type: 'Initializing' }
      newState.startTime = null
      return newState
    }

    case 'RECEIVE_INITIALIZE': {
      let newState = state.clone()
      newState.turns = []
      newState.cardSources = [...action.payload.cardSources]
      newState.cards = action.payload.cards.map(sourceIndex => {
        return { sourceIndex, state: CardState.Hidden }
      })
      newState.state = { type: 'Idle' }
      newState.startTime = null
      return newState
    }

    case 'BEGIN_GUESS': {
      let newState = state.clone()
      if (state.state.type === 'Idle') {
        newState.state = { type: 'Guessing', card: action.payload.card }
        newState.hideAllCards()
        newState.cards[action.payload.card].state = CardState.Visible
        if (state.startTime === null) {
          newState.startTime = action.payload.timestamp
        }
      }
      return newState
    }

    case 'END_GUESS': {
      let newState = state.clone()
      if (state.state.type === 'Guessing' && state.state.card !== action.payload.card) {
        const newTurn = {
          timestamp: action.payload.timestamp,
          cards: { a: state.state.card, b: action.payload.card }
        }

        newState.turns.push(newTurn)
        newState.state = { type: 'Idle' }

        if (newState.isTurnCorrect(newTurn)) {
          newState.cards[newTurn.cards.a].state = CardState.Removed
          newState.cards[newTurn.cards.b].state = CardState.Removed
        } else {
          newState.cards[newTurn.cards.a].state = CardState.WasVisible
          newState.cards[newTurn.cards.b].state = CardState.WasVisible
        }
      }
      return newState
    }
  }

  return DEFAULT_STATE
}
