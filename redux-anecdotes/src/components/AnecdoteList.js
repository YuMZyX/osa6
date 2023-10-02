import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter(a => a.content.toUpperCase().includes(filter.toUpperCase()))
  })
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`You voted: '${content}'`, 5))
  }

  const showAnecdotes = () => {
    if (anecdotes) {
      return anecdotes.sort((a, b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
        )
    }
    return
  }
  
  return (
    <div>
      {showAnecdotes()}
    </div>
  )
}
export default AnecdoteList