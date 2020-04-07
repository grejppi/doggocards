export enum CardState {
  Hidden,
  Visible,
  WasVisible,
  Removed,
}

export type TurnStateInitializing = { type: 'Initializing' }
export type TurnStateIdle = { type: 'Idle' }
export type TurnStateGuessing = { type: 'Guessing', card: number }

export type TurnState
  = TurnStateInitializing
  | TurnStateIdle
  | TurnStateGuessing

export type Card = {
  sourceIndex: number,
  state: CardState,
}

export type CardSource = {
  url: string,
  name: string,
}

export type Turn = {
  timestamp: number,
  cards: { a: number, b: number },
}

export class GameState {
  turns: Array<Turn> = []
  cardSources: Array<CardSource> = []
  cards: Array<Card> = []
  state: TurnState = { type: 'Initializing' }
  startTime: number | null = null

  clone(): GameState {
    let clone = new GameState()
    clone.turns = [...this.turns]
    clone.cardSources = [...this.cardSources]
    clone.cards = [...this.cards]
    clone.state = { ...this.state }
    clone.startTime = this.startTime
    return clone
  }

  isTurnCorrect(turn: Turn): boolean {
    return this.cards[turn.cards.a].sourceIndex
      === this.cards[turn.cards.b].sourceIndex
  }

  correctTurnsCount(): number {
    return this.turns.reduce((total, turn) => total + Number(this.isTurnCorrect(turn)), 0)
  }

  turnCounts(): { correct: number, wrong: number } {
    const correct = this.correctTurnsCount()
    const wrong = this.turns.length - correct
    return { correct, wrong }
  }

  hideAllCards() {
    for (let card of this.cards) {
      if (card.state !== CardState.Removed) {
        card.state = CardState.Hidden;
      }
    }
  }

  turnsWithRelativeTimestamps(): Array<Turn> {
    return this.turns.map(turn => {
      const timestamp = turn.timestamp - (this.startTime ?? 0)
      console.log(this.startTime, turn.timestamp, turn.timestamp - (this.startTime ?? 0), timestamp)
      return { ...turn, timestamp }
    })
  }

  finished(): boolean {
    return this.cards.every(card => card.state === CardState.Removed)
  }
}
