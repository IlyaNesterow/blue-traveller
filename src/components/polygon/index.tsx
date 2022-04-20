import { css, StyleSheet } from 'aphrodite'


const Polygon = () => {
  return(
    <section className={css(component.size)}>
      <div className={css(component.frame)}>
        <div className={css(component.container)}>

        </div>
      </div>
    </section>
  )
}

const component = StyleSheet.create({
  size: {
    width: '100%',
    height: 400,
    marginBottom: 20
  },
  frame: {
    border: 'solid 1px var(--frame-clr)',
    overflow: 'hidden',
    borderRadius: 8,
    height: 400
  },
  container: {
    backgroundColor: 'var(--bright-bg)',
    height: '100%',
    padding: 24
  }
})

export default Polygon