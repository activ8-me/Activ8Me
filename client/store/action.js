export function randomGame (games, prevGame) {
  let game = Math.floor(Math.random()*games)
  while (game === prevGame) {
    game = Math.floor(Math.random()*games)
  }
  return {
    type: 'RANDOM_GAME',
    game
  }
}

export function winning () {
  return {
    type: 'WINNING'
  }
}

export function snooze () {
  return {
    type: 'SNOOZE'
  }
}