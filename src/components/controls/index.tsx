import { useContext } from 'react'
import { css, StyleSheet } from 'aphrodite'
import { AppContext } from '../../tools'
import Pause from './Pause'
import Start from './Start'
import End from './End'


const Controls = () => {
  const { isRunning } = useContext(AppContext).state.current

  return(
    <section className={css(component.container)}>
      <div className={css(component.flex)}>
        {
          isRunning
            ? <End/>
            : <Start/>
        }
        <Pause/>
      </div>
    </section>
  )
}

const component = StyleSheet.create({
  container: {
    width: '100%'
  },
  flex: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default Controls