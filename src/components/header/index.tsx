import { StyleSheet, css } from 'aphrodite'
import { corePhrases } from '../../tools'


const Header = () => {
  return(
    <section className={css(component.container)}>
      <div className={css(component.margin)}>
        <header>
          <div className={css(component.h1Container)}>
            <h1 className={css(component.h1)}>
              {corePhrases.header.title}
            </h1>
          </div>
          <div className={css(component.rules)}>
            {corePhrases.header.description}
          </div>
        </header>
      </div>
    </section>
  )
}

const component = StyleSheet.create({
  container: {
    width: '100%'
  },
  margin: {
    marginBottom: 24
  },
  h1Container: {
    marginBottom: 12
  },
  h1: {
    color: 'var(--dark-clr)',
    fontSize: 20
  },
  rules: {
    color: 'var(--grey)',
    fontWeight: 400,
    fontSize: 14
  }
})

export default Header