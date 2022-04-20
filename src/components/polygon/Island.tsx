import { useContext, useState, useEffect } from 'react'
import { css, StyleSheet } from 'aphrodite'
import { Human, Computer } from '../../assets'
import { Island, Player, AppContext } from '../../tools'


interface Props {
  data: Island
}

const Point: React.FC<Props> = ({ data }) => {
  const { state, moveHuman } = useContext(AppContext)

  const { players, islands, humanCanMove, isRunning, isPaused, result } = state.current

  const [opened, setOpened] = useState(false)

  const { position, isTaken, player, id } = data
 
  useEffect(() => {
    const checkAvailability = () => {
      const human = players.find((p) => p.role === Player.HUMAN)!

      const island = islands.find((i) => i.id === human.currentIsland)!
     
      const adjecentX = [position.x + 70, position.x, position.x - 70]

      const adjecentY = [position.y + 70, position.y, position.y - 70]

      setOpened(adjecentX.includes(island.position.x) && adjecentY.includes(island.position.y))
    }

    if(humanCanMove && !isTaken && !isPaused && isRunning) checkAvailability()
  }, [humanCanMove, isTaken, players, islands, isRunning, isPaused, position])

  const style = StyleSheet.create({
    position: {
      position: 'absolute',
      left: position.x,
      top: position.y
    },
    bg: {
      height: 32,
      width: 32,
      borderRadius: '50%',
      border: 'solid 1px var(--dark-clr)',
      backgroundColor: isTaken 
        ? !!player 
          ? 'var(--gold-clr)' 
          : 'var(--dark-red)' 
        : 'var(--dark-green)'
    },
    shadow: {
      backgroundColor: opened && !isPaused && !result ? 'transparent' : '#ffffff33',
      position: 'absolute',
      borderRadius: '50%',
      height: '100%',
      width: '100%',
      left: 0,
      top: 0,
    },
    svg: {
      position: 'absolute',
      top: 'calc(50% - 10px)',
      left: 'calc(50% - 10px)',
      ':nth-child(1n) > svg': {
        height: 20,
        width: 20
      }
    },
    focus: {
      transition: 'opacity .5s',
      ':focus-visible': {
        opacity: 0.5
      }
    }
  })

  return(
    <div className={css(style.position)}>
      <button 
        onClick={() => moveHuman(id)}
        className={css(component.btn, style.focus)}
        disabled={!opened || isPaused || !!result || !!player}
      >
        <div className={css(style.bg)}>
          <div className={css(style.shadow)}/>
          {
            player &&
            <div className={css(style.svg)}>
              {
                player === Player.HUMAN
                  ? <Human/>
                  : <Computer/>
              }
            </div>
          }
        </div>
      </button>
    </div>
  )
}

const component = StyleSheet.create({
  btn: {
    height: 40,
    width: 40,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Point