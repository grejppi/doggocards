import { GameState, CardSource, Turn } from '../../stores/game/models/GameState'
import { initialize, GameAction } from '../../stores/game/GameAction'
import rootStore from '../../stores/rootStore'
import React, { Dispatch } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (gameState: GameState) => {
  return { game: gameState.clone() }
}

const mapDispatchToProps = (dispatch: Dispatch<GameAction>) => ({
  initialize: () => initialize()(rootStore.dispatch, rootStore.getState, null)
})

const renderDoggo = (src: CardSource, index: number, game: GameState) => {
  const isRelevant = (turn: Turn) => game.cards[turn.cards.a].sourceIndex === index
  const nTries = game.turns
    .reduce((n, turn) => n += +(isRelevant(turn)), 0)

  let first = Math.min(...game.turns.filter(isRelevant).map(turn => turn.timestamp))
  let last = Math.max(...game.turns.filter(isRelevant).map(turn => turn.timestamp))

  first = Number.isNaN(first) ? 0 : first
  last = Number.isNaN(last) ? 0 : last

  const time = `${Math.round((last - first) / 1000)} s`

  const tries = `${nTries} ${nTries === 1 ? 'try' : ('tries in ' + time)}`

  return <div className="flex flex-row py-1" key={src.name}>
    <div className="w-16 h-16">
      <div className="p-1 w-full h-full">
        <div
          className="rounded shadow w-full h-full"
          style={{
            backgroundImage: `url(${src.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
        }}
        ></div>
      </div>
    </div>
    <div className="flex flex-col flex-grow items-start justify-center ml-2">
      <h3 className="text-gray-700">{src.name}</h3>
      <p className="text-gray-600 text-sm">found after {tries}</p>
    </div>
  </div>
}

const ScoreCard = (props: any) => {
  const game: GameState = props.game

  return <>{game.finished() &&
    <div className="fixed w-screen h-screen top-0 flex flex-col items-center justify-center">
      <div className="m-auto bg-white border-gray-200 border rounded-lg shadow-lg p-6">
        <div className="flex flex-col">
          {game.cardSources.map((src, index) => renderDoggo(src, index, game))}
        </div>
      </div>
    </div>
  }</>
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreCard)
