import { useContext } from 'react'
import { css } from 'aphrodite'
import { corePhrases } from '../../tools/phrases' 
import { AppContext } from '../../tools' 
import { button } from './style'


const Pause = () => {
  const { pauseGame, resumeGame, state } = useContext(AppContext)

  const { isPaused, isRunning } = state.current

  if(!isRunning) return null

  return(
    <button 
      className={css(button.btn)}
      onClick={
        isPaused
          ? resumeGame
          : pauseGame
      }
    >
      <div className={css(button.beforeBtn)}/>
        {
          isPaused
            ? corePhrases.btns.resume
            : corePhrases.btns.pause
          }
    </button>
  )
}

export default Pause