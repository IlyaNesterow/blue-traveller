import { useContext } from 'react'
import { css } from 'aphrodite'
import { corePhrases } from '../../tools/phrases' 
import { AppContext } from '../../tools' 
import { button } from './style'


const End = () => {
  const { endGame } = useContext(AppContext)

  return(
    <button 
      className={css(button.btn)}
      onClick={endGame}
    >
      <div className={css(button.beforeBtn)}/>
        {corePhrases.btns.end}
    </button>
  )
}

export default End