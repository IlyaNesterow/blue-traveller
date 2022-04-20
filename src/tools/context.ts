import { createContext } from 'react'


export enum GameResult {
  VICTORY='VICTORY',
  LOSS='LOSS'
}


export enum Player {
  SYSTEM='SYSTEM',
  HUMAN='HUMAN'
}


export interface PlayerState {
  role: Player
  currentIsland: string
  visitedIslands: string[]
}


export interface Island {
  readonly id: string
  player: Player | null
  position: {
    readonly y: number
    readonly x: number
  }
  isTaken: boolean
  score: number
}


export interface CurrentMatch {
  islands: Island[]
  isPaused: boolean
  isRunning: boolean 
  humanCanMove: boolean
  players: PlayerState[]
  result: GameResult | null
}


export interface AppState {
  hasPlayed: boolean
  current: CurrentMatch
}


export const AppContext = createContext<{
  state: AppState
  endGame: () => void
  startGame: () => void
  pauseGame: () => void
  resumeGame: () => void
  declareVictory: () => void
  moveHuman: (id: string) => void
}>({
  state: {
    hasPlayed: false,
    current: {
      islands: [],
      players: [],
      humanCanMove: false,
      isRunning: false,
      isPaused: false,
      result: null,
    }
  },
  endGame: () => {},
  startGame: () => {},
  pauseGame: () => {},
  moveHuman: () => {},
  resumeGame: () => {},
  declareVictory: () => {}
})


export const matchDefaults = {
  humanCanMove: false,
  isRunning: false,
  isPaused: false,
  result: null,
  players: [
    { role: Player.HUMAN, currentIsland: 'human-start', visitedIslands: ['human-start'] },
    { role: Player.SYSTEM, currentIsland: 'system-start', visitedIslands: ['system-start'] }
  ],
  islands: []
}