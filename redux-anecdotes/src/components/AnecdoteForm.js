import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { getId } from '../reducers/anecdoteReducer'
import { notifyCreate, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote({ content, votes: 0, id: getId() }))
    dispatch(notifyCreate(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm