import { connect } from 'react-redux'
import React, { Dispatch } from 'react'
import { GameState, Card, CardState } from '../../stores/game/models/GameState'
import { beginGuess, GameAction, endGuess } from '../../stores/game/GameAction'

import './Board.css'

const mapStateToProps = (gameState: GameState) => {
  return { game: gameState.clone() }
}

const mapDispatchToProps = (dispatch: Dispatch<GameAction>) => ({
  beginGuess: (card: number) => dispatch(beginGuess(card)),
  endGuess: (card: number) => dispatch(endGuess(card)),
})

const style = (state: CardState, image: string) => {
  const shouldBeVisible = state !== CardState.Hidden

  let style: any = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center top',
    opacity: shouldBeVisible ? '1' : '0',
  }

  if (state === CardState.WasVisible) {
    style.animationName = 'hide'
    style.animationDuration = '1s'
    style.animationFillMode = 'forwards'
  }

  return style
}

const Board = (props: any) => {
  const game: GameState = props.game
  return <div className="fixed w-screen h-screen z-20">
    <div className="flex flex-row flex-wrap mx-auto  w-screen h-screen-w  sm:w-4x32 sm:h-4x32  lg:w-4x48 lg:h-4x48">
      {game.cards.map((card: Card, index: number) =>
        <div className="p-screen-relative sm:p-2  w-screen-quarter h-screen-w-quarter  sm:w-32 sm:h-32  lg:w-48 lg:h-48" key={`${index}:${card.sourceIndex}`}>
          <div
            className="rounded shadow-md w-full h-full bg-gray-400"
          >
            <div className="w-full h-full rounded shadow-inner"
              style={style(card.state, game.cardSources[card.sourceIndex].url)}
              onClick={
                () => {
                  if (card.state !== CardState.Removed) {
                    game.state.type === 'Idle' ? props.beginGuess(index) : props.endGuess(index)
                  }
                }
              }
            >
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
