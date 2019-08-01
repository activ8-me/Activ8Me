export function randomGame (games, gameDone) {
  let game = Math.floor(Math.random()*games)
  while (gameDone.indexOf(game) >= 0) {
    game = Math.floor(Math.random()*games)
  }
  return {
    type: 'RANDOM_GAME',
    game
  }
}

export function winning (gameId, gameDone) {
  if (gameDone.indexOf(gameId) < 0) {
    return {
      type: 'WINNING',
      gameId
    }
  }
}

export function snooze () {
  return {
    type: 'SNOOZE'
  }
}

export function awake () {
  return {
    type: 'AWAKE'
  }
}

export function resetWin () {
  return {
    type: 'RESET'
  }
}

export function ring () {
  return {
    type: "RING"
  }
}

export function stop () {
  return {
    type: "STOP"
  }
}

export function repopulate (state) {
  return {
    type: "REPOPULATE",
    state
  }
}

export function setAlarm (id) {
  return {
    type: "SET_ALARM",
    id
  }
}

export function setAlarmSound (sound) {
  return {
    type: "ALARM_SOUND",
    sound
  }
}