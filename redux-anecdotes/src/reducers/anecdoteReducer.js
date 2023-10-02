import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const voteAnecdote = id => {
  return async dispatch => {
    const anecdoteToVote = await anecdoteService.get(id)
    const changedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1}
    await anecdoteService.update(id, changedAnecdote)
    dispatch(initializeAnecdotes())
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer