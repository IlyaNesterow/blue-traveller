import React from 'react'
import Global from './styles'
import Timer from './components/time'
import Header from './components/header'
import Polygon from './components/polygon'
import Controls from './components/controls'
import { css, StyleSheet } from 'aphrodite'


function App() {
  return (
    <>
      <Global/>
      <main>
        <div className={css(component.container)}>
          <div className={css(component.centred)}>
            <div className={css(component.layout)}>
              <Header/>
              <Timer/>
              <Polygon/>
              <Controls/>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

const component = StyleSheet.create({
  container: {
    position: 'relative',
    minHeight: 500,
    height: '100%',
    width: '100%'
  },
  centred: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  layout: {
    width: 800,
    display: 'flex',
    padding: '70px 0',
    alignItems: 'center',
    flexDirection: 'column',
    '@media (max-width: 809px)': {
      width: '100%'
    }
  }
})

export default App;
