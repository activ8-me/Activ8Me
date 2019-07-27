const initialState = {
  snooze: false,
  winning: 0,
  gameSelect: 0,
  gameDone: []
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
        winning: 0
      }
    default:
      return state
  }
}