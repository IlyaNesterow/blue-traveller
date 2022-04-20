import { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import Global from './styles'
import Timer from './components/time'
import Header from './components/header'
import Result from './components/result'
import Toggler from './components/toggler'
import Polygon from './components/polygon'
import Controls from './components/controls'
import { css, StyleSheet } from 'aphrodite'
import { 
  AppContext, Island, Player, CurrentMatch, 
  GameResult, targetAdjecentX, targetAdjecentY
} from './tools'


function App() {
  const [hasPlayed, setHasPlayed] = useState(false)

  const [mode, setMode] = useState(Player.HUMAN)

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
      humanCanMove: mode === Player.HUMAN,
      isRunning: false,
      isPaused: false,
      result: null,
      players: [
        { role: Player.HUMAN, currentIsland: 'human-start', visitedIslands: ['human-start'] },
        { role: Player.SYSTEM, currentIsland: 'system-start', visitedIslands: ['system-start'] }
      ],
      islands: []
    })

    if(!hasPlayed) setHasPlayed(true)
  }

  const startGame = () => {
    const islands: Island[] = []

    const xThresholds = [350]
    const yThresholds = [210]

    let i = 0

    const scores = {
      y: { value: 0, increase: true },
      x: { value: 0, increase: true }
    }

    while(i < 460) {
      let j = 0

      while(j < 760) {
        if(scores.x.value === 6 && scores.x.increase) {
          scores.x.value = scores.x.value - 1
          scores.x.increase = false
        } 
        else if(scores.x.increase) scores.x.value = scores.x.value + 1
        else if(!scores.x.increase) scores.x.value = scores.x.value - 1
        
        if(yThresholds.includes(i) && xThresholds.includes(j)) {
          j = j + 70
          continue
        }
        
        const y = i + 15

        const x = j + 15

        if((y === 365 && x === 15) || (y === 85 && x === 715)) {
          islands.push({
            score: 1,
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

        const score = (scores.x.value + scores.y.value)

        islands.push({
          position: { x, y }, id, score,
          isTaken: false, player: null
        })

        j = j + 70
      }

      if(scores.y.value === 3 && scores.y.increase) {
        scores.y.value = scores.y.value - 1
        scores.y.increase = false
      } 
      else if(scores.y.increase) scores.y.value = scores.y.value + 1
      else if(!scores.y.increase) scores.y.value = scores.y.value - 1
      
      scores.x.value = 0
      scores.x.increase = true

      i = i + 70
    }
    
    setCurrentMatch((m) => ({ 
      result: null, islands, humanCanMove: mode === Player.HUMAN,
      isPaused: false, isRunning: true,
      players: [
        { role: Player.HUMAN, currentIsland: 'human-start', visitedIslands: ['human-start'] },
        { role: Player.SYSTEM, currentIsland: 'system-start', visitedIslands: ['system-start'] }
      ]
    }))
  }

  useEffect(() => {
    const { humanCanMove, result, isRunning, isPaused, players, islands } = currentMatch

    const makeAMove = () => {
      const moveComputer = (id: string) => {
        const computer = currentMatch.players.find((p) => p.role === Player.SYSTEM)!
    
        const oldIsland = currentMatch.islands.find((i) => i.id === computer.currentIsland)!
    
        oldIsland.player = null
    
        const newIsland = currentMatch.islands.find((i) => i.id === id)!
    
        newIsland.player = Player.SYSTEM
    
        newIsland.isTaken = true
    
        const exception = [id, computer.currentIsland]
    
        const islands = [...currentMatch.islands.filter((i) => !exception.includes(i.id)), newIsland, oldIsland]
    
        computer.currentIsland = id
    
        computer.visitedIslands.push(id)
    
        const players = [...currentMatch.players.filter((p) => p.role !== Player.SYSTEM), computer]
    
        setCurrentMatch((p) => ({ 
          ...p, players, islands,
          humanCanMove: true
        }))
      }

      const getMaximum = (islands: Island[]) => {
        let max = islands[0]

        for(let i of islands) {
          if(max.score < i.score) max = i
        }

        return max.id
      }

      const player = players.find((p) => p.role === Player.SYSTEM)!

      //current position
      const island = islands.find((i) => i.id === player.currentIsland)!

      const { x, y } = island.position
      
      //target is next
      if(targetAdjecentX.includes(x) && targetAdjecentY.includes(y)) {
        const island = currentMatch.islands.find((i) => i.player === Player.SYSTEM)!

        island.player = null

        const islands = [
          ...currentMatch.islands.filter((i) => i.id !== island.id),
          island
        ]
        
        setCurrentMatch((s) =>({
          ...s, isRunning: false, islands,
          result: GameResult.LOSS,
        }))
      } else {
        //neighbour coords
        const adjecentX = [x + 70, x, x - 70]

        const adjecentY = [y + 70, y, y - 70]

        //neighbours
        const neighbours = islands.filter((v) => 
          !v.isTaken && adjecentX.includes(v.position.x) &&
          adjecentY.includes(v.position.y) && v.id !== island.id
        )
        //the 'best' neighbour
        const max = getMaximum(neighbours)

        moveComputer(max)
      }
    }

    if(!humanCanMove && !result && isRunning && !isPaused) makeAMove()
  }, [currentMatch])

  useEffect(() => {
    if(!!currentMatch.result && !hasPlayed) setHasPlayed(true)
  }, [hasPlayed, currentMatch])
  
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

    setCurrentMatch((p) => ({ 
      ...p, players, islands,
      humanCanMove: false
    }))
  }

  const declareVictory = () => {
    const island = currentMatch.islands.find((i) => i.player === Player.HUMAN)!

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

  const resetStarter = (p: Player) => {
    setMode(p)
  }

  return (
    <AppContext.Provider value={{
      state: { current: currentMatch, hasPlayed, whoStarts: mode }, 
      resumeGame, moveHuman, pauseGame, startGame, 
      endGame, declareVictory, resetStarter
    }}>
      <Global/>
      <main>
        <div className={css(component.container)}>
          <div className={css(component.centred)}>
            <div className={css(component.layout)}>
              <Header/>
              <Toggler/>
              <Result/>
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
      width: '100%',
      padding: '70px 24px'
    }
  }
})

export default App;
