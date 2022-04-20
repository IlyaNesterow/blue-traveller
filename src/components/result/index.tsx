import { useContext } from 'react'
import { css, StyleSheet } from 'aphrodite'
import { AppContext, GameResult, corePhrases } from '../../tools'


const Result = () => {
  const { result } = useContext(AppContext).state.current

  if(!result) return null

  const style = StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: 12,
    },
    frame: {
      border: `solid 2px ${result === GameResult.LOSS ? 'var(--dark-red)' : 'var(--dark-green)'}`,
      borderRadius: 12,
      padding: 12
    },
    text: {
      fontSize: 14,
      fontWeight: 600,
      color: result === GameResult.LOSS ? 'var(--dark-red)' : 'var(--dark-green)'
    }
  })

  return(
    <section className={css(style.container)}>
      <div className={css(style.frame)}>
        <div className={css(style.text)}>
          {
            result === GameResult.LOSS
              ? corePhrases.result.failure
              : corePhrases.result.success
          }
        </div>
      </div>
    </section>
  )
}

export default Result