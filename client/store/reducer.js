const initialState = {
  snooze: false,
  winning: 0,
  gameSelect: 0
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case "WINNING":
      return {
        ...state,
        winning: state.winning + 1
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
    default:
      return state
  }
}