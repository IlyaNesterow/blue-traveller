import { useContext } from 'react'
import { css, StyleSheet } from 'aphrodite'
import { AppContext, Player, corePhrases } from '../../tools'
import { Check } from '../../assets'


const Toggler = () => {
  const { state, resetStarter } = useContext(AppContext)

  const { whoStarts } = state

  const checked = whoStarts === Player.HUMAN

  const component = StyleSheet.create({
    container: {
      width: '100%',
      marginBottom: 16,
      marginLeft: -8
    },
    flex: {
      display: 'flex',
      alignItems: 'center'
    },
    btn: {
      backgroundColor: checked ? 'var(--title-clr)' : 'transparent',
      '@media (hover: hover) and (pointer: fine)': {
        ':hover': {
          borderColor: checked ? 'var(--title-clr)' : 'var(--grey-clr)'
        }
      }
    },
    squareCheckbox: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer'
    },
    squareCheckboxBtn: {
      marginLeft: 4,
      border: 'solid 1px var(--title-clr)',
      borderRadius: 4,
      height: 25,
      width: 25,
      transition: 'all .3s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      ':focus-visible :nth-child(1n)': {
        borderColor: 'var(--title-clr)'
      } 
    },
    beforeSquareCheckboxBtn: {
      position: 'absolute',
      top: -4,
      left: -4,
      width: 'calc(100% + 8px)',
      height: 'calc(100% + 8px)',
      border: 'solid 1px transparent',
      borderRadius: 6
    },
    squareCheckboxSvg: {
      ':nth-child(1n) > svg': {
        height: 13,
        width: 13
      }
    },
    squareCheckboxLbl: {
      marginLeft: 10,
      color: 'var(--title-clr)',
      fontWeight: 400,
      fontSize: 16
    }
  })

  const onClick = () => {
    resetStarter(checked ? Player.SYSTEM : Player.HUMAN)
  }

  return(
    <section className={css(component.container)}>
      <div className={css(component.squareCheckbox)}>
        <button 
          {...{onClick}}
          className={css(component.btn, component.squareCheckboxBtn)}
        >
          <div className={css(component.beforeSquareCheckboxBtn)}/>
          <div className={css(component.squareCheckboxSvg)}>
            <Check/>
          </div>
        </button>
        <div 
          id="label"
          {...{onClick}}
          className={css(component.squareCheckboxLbl)}
        >
          {corePhrases.btns.starter}
        </div>
      </div>
    </section>
  )
}


export default Toggler