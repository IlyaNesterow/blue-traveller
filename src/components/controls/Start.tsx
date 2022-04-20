import { useContext } from 'react'
import { css } from 'aphrodite'
import { corePhrases } from '../../tools/phrases' 
import { AppContext } from '../../tools' 
import { button } from './style'


const Start = () => {
  const { state, startGame } = useContext(AppContext)

  const { hasPlayed } = state

  return(
    <button 
      className={css(button.btn)}
      onClick={startGame}
    >
      <div className={css(button.beforeBtn)}/>
        {
          hasPlayed
            ? corePhrases.btns.try_again
            : corePhrases.btns.start
        }
    </button>
  )
}


export default Start