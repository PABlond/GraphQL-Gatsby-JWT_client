import initialState from "./initialState"
import constants from "./../config/constants"

export default (
  state = initialState.user,
  action: { type: string; payload: any }
) => {
  const { userInfo } = constants
  const { type, payload } = action
  switch (type) {
    case userInfo.name:
      return {
        ...state,
        email: payload.email,
        firstname: payload.firstname,
        lastname: payload.lastname,
      }
    default:
      return state
  }
}
