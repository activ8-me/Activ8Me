const initialState = {
  snooze: false,
  winning: 0,
  gameSelect: 0,
  gameDone: [0],
  alarm: false,
  repopulate: false,
  alarmId: '',
  alarmSound: ''
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case "WINNING":
      return {
        ...state,
        winning: state.winning + 1,
        gameDone: state.gameDone.concat(action.gameId)
      }
    case "RANDOM_GAME":
      return {
        ...state,
        gameSelect: action.game
      }
    case "SNOOZE":
      return {
        ...state,
        snooze: true
      }
    case "AWAKE":
      return {
        ...state,
        snooze: false
      }
    case "RESET":
      return {
        ...state,
        winning: 0,
        gameSelect: 0,
        gameDone: [0]
      }
    case "RING":
      return {
        ...state,
        alarm: true
      }
    case "STOP":
      return {
        ...state,
        alarm: false
      }
    case "REPOPULATE":
      return {
        ...state,
        repopulate: action.state
      }
    case "SET_ALARM":
      return {
        ...state,
        alarmId: action.id
      } 
    case "ALARM_SOUND":
      return {
        ...state,
        alarmSound: action.sound
      }
    default:
      return state
  }
}