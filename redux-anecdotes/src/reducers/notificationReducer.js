import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice ({
  name: 'notification',
  initialState,
  reducers: {
    notifyVote(state, action) {
      return `You voted: ${action.payload}`
    },
    notifyCreate(state, action) { 
      return `New anecdote created: ${action.payload}`
    },
    removeNotification(state) {
      state = initialState
      return state
    }
  }
})

export const { notifyVote, notifyCreate, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer