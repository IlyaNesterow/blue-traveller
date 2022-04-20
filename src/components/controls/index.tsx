import { css, StyleSheet } from 'aphrodite'
import Start from './Start'


const Controls = () => {
  return(
    <section className={css(component.container)}>
      <div className={css(component.flex)}>
        <Start/>
        <div/>
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