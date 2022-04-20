import { useState } from 'react'
import { v4 } from 'uuid'
import Global from './styles'
import Timer from './components/time'
import Header from './components/header'
import Polygon from './components/polygon'
import Controls from './components/controls'
import { css, StyleSheet } from 'aphrodite'
import { AppContext, Island, Player, CurrentMatch, GameResult } from './tools'


function App() {
  const [currentMatch, setCurrentMatch] = useState<CurrentMatch>({
    humanCanMove: false,
    isRunning: false,
    isPaused: false,
    result: null,
    players: [
      { role: Player.HUMAN, currentIsland: 'human-start', visitedIslands: ['human-start'] },
      { role: Player.SYSTEM, currentIsland: 'system-start', visitedIslands: ['system-start'] }
    ],
    islands: []
  })

  const endGame = () => {
    setCurrentMatch({
      humanCanMove: false,
      isRunning: false,
      isPaused: false,
      result: null,
      players: [
        { role: Player.HUMAN, currentIsland: 'human-start', visitedIslands: ['human-start'] },
        { role: Player.SYSTEM, currentIsland: 'system-start', visitedIslands: ['system-start'] }
      ],
      islands: []
    })
  }

  const startGame = () => {
    const islands: Island[] = []

    const xThresholds = [350]
    const yThresholds = [210]

    let i = 0

    const fillTheRov = (i: number) => {
      let j = 0

      while(j < 760) {
        if(yThresholds.includes(i) && xThresholds.includes(j)) {
          j = j + 70
          continue
        }
        
        const y = i + 15

        const x = j + 15

        if((y === 365 && x === 15) || (y === 85 && x === 715)) {
          islands.push({
            position: { x, y }, 
            id: y === 365 
              ? 'human-start' 
              : 'system-start',
            isTaken: true, 
            player: y === 365 
              ? Player.HUMAN
              : Player.SYSTEM
          })

          j = j + 70
          
          continue
        }

        const id = v4()

        islands.push({
          position: { x, y }, id,
          isTaken: false, player: null
        })

        j = j + 70
      }
    }

    while(i < 460) {
      fillTheRov(i)
      
      i = i + 70
    }
    
    setCurrentMatch((m) => ({ 
      result: null, islands, humanCanMove: true,
      isPaused: false, isRunning: true,
      players: [
        { role: Player.HUMAN, currentIsland: 'human-start', visitedIslands: ['human-start'] },
        { role: Player.SYSTEM, currentIsland: 'system-start', visitedIslands: ['system-start'] }
      ]
    }))
  }
  
  const pauseGame = () => {
    setCurrentMatch((r) => ({ ...r, isPaused: true }))
  }

  const resumeGame = () => {
    setCurrentMatch((r) => ({ ...r, isPaused: false }))
  }

  const moveHuman = (id: string) => {
    const human = currentMatch.players.find((p) => p.role === Player.HUMAN)!

    const oldIsland = currentMatch.islands.find((i) => i.id === human.currentIsland)!

    oldIsland.player = null

    const newIsland = currentMatch.islands.find((i) => i.id === id)!

    newIsland.player = Player.HUMAN

    newIsland.isTaken = true

    const exception = [id, human.currentIsland]

    const islands = [...currentMatch.islands.filter((i) => !exception.includes(i.id)), newIsland, oldIsland]

    human.currentIsland = id

    human.visitedIslands.push(id)

    const players = [...currentMatch.players.filter((p) => p.role !== Player.HUMAN), human]

    setCurrentMatch((p) => ({ ...p, players, islands }))
  }

  const declareWinner = (p: Player) => {
    if(p === Player.SYSTEM) {
      setCurrentMatch((s) =>({
        ...s, isRunning: false,
        result: GameResult.LOSS
      }))
    } else {
      const player = currentMatch.players.find((p) => p.role === Player.HUMAN)!

      const island = currentMatch.islands.find((i) => i.id === player.currentIsland)!

      island.player = null

      const islands = [
        ...currentMatch.islands.filter((i) => i.id !== island.id),
        island
      ]

      setCurrentMatch((s) =>({
        ...s, isRunning: false, islands,
        result: GameResult.VICTORY
      }))
    }
  }

  return (
    <AppContext.Provider value={{
      state: {
        current: currentMatch,
        hasPlayed: false
      }, 
      resumeGame, moveHuman, pauseGame,
      startGame, endGame, declareWinner
    }}>
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
    </AppContext.Provider>
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
    width: 770,
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
