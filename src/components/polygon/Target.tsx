import { useContext, useEffect, useState } from 'react'
import { css, StyleSheet } from 'aphrodite'
import { AppContext, GameResult, Player } from '../../tools'
import { Finish, Human, Computer } from '../../assets'


const Target = () => {
  const { state, declareWinner } = useContext(AppContext)

  const { 
    isRunning, players, isPaused,
    humanCanMove, islands, result
  } = state.current

  const [available, setAvailable] = useState(false)

  useEffect(() => {
    const checkAvailability = () => {
      const human = players.find((p) => p.role === Player.HUMAN)!

      const island = islands.find((i) => i.id === human.currentIsland)!

      const { x, y } = island.position 
     
      const adjecentX = [295, 365, 435]

      const adjecentY = [155, 225, 295]

      setAvailable(adjecentX.includes(x) && adjecentY.includes(y))
    }

    if(humanCanMove && !result && !isPaused && isRunning) checkAvailability()
  }, [humanCanMove, result, players, islands, isRunning, isPaused])

  const style = StyleSheet.create({
    shadow: {
      backgroundColor: available ? 'transparent' : '#ffffff88',
      position: 'absolute',
      borderRadius: '50%',
      height: '100%',
      width: '100%',
      left: 0,
      top: 0,
    },
    flag: {
      position: 'absolute',
      top: 'calc(50% - 15px)',
      left: 'calc(50% - 15px)',
      ':nth-child(1n) > svg': {
        height: result ? 20 : 30,
        width: result ? 20 : 30
      }
    },
    player: {
      position: 'absolute',
      top: 'calc(50% + 1px)',
      left: 'calc(50% + 1px)',
      ':nth-child(1n) > svg': {
        height: 20,
        width: 20
      }
    }
  })

  return(
    <div className={css(component.container)}>
      <button 
        disabled={!available}
        className={css(component.button)}
        onClick={() => declareWinner(Player.HUMAN)}
      >
        <div className={css(component.relative)}>
          <div className={css(style.shadow)}/>
          <div className={css(style.flag)}>
            <Finish/>
          </div>
          {
            result && 
            <div className={css(style.player)}>
              {
                result === GameResult.LOSS
                  ? <Computer/>
                  : <Human/>
              }
            </div>
          }
        </div>
      </button>
    </div>
  )
}

const component = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 'calc(50% - 30px)',
    left: 'calc(50% - 30px)',
  },
  button: {
    border: 'solid 1px var(--dark-clr)',
    backgroundColor: 'var(--gold-clr)',
    borderRadius: '50%',
    height: 60,
    width: 60
  },
  relative: {
    position: 'relative',
    height: '100%',
    width: '100%'
  }
})

export default Target