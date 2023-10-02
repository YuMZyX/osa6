import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice ({
  name: 'notification',
  initialState,
  reducers: {
    notify(state, action) { 
      return action.payload
    },
    removeNotification(state) {
      state = initialState
      return state
    }
  }
})

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(notify(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export const { notify, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer