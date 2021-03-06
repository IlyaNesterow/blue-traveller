import { useContext } from 'react'
import { css, StyleSheet } from 'aphrodite'
import { AppContext } from '../../tools'
import Target from './Target'
import Island from './Island'


const Polygon = () => {
  const { islands } = useContext(AppContext).state.current

  return(
    <section className={css(component.size)}>
      <div className={css(component.frame)}>
        <div className={css(component.container)}>
          <Target/>
          <>
            {
              islands.map((i) => (
                <Island 
                  key={i.id}
                  data={i}
                />
              ))
            }
          </>
        </div>
      </div>
    </section>
  )
}

const component = StyleSheet.create({
  size: {
    width: 770,
    marginBottom: 20,
    '@media (max-width: 809px)': {
      transform: 'scale(0.7)'
    },
    '@media (max-width: 609px)': {
      transform: 'scale(0.5)'
    },
    '@media (max-width: 409px)': {
      transform: 'scale(0.3)'
    }
  },
  frame: {
    border: 'solid 1px var(--dark-clr)',
    boxShadow: 'var(--plain-shadow)',
    overflow: 'hidden',
    borderRadius: 8,
    height: 490
  },
  container: {
    backgroundColor: 'var(--blue)',
    position: 'relative',
    height: '100%',
    padding: 24
  }
})

export default Polygon