import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests' 
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useContext, useReducer } from 'react'
import NContext from './NotificationContext'

const nReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE':
      return `You voted: ${action.payload}`
    case 'CREATE':
      return `Added anecdote: ${action.payload}`
    default:
      return state
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(nReducer, '')
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      queryClient.setQueryData({ queryKey: ['anecdotes'] }, anecdotes
        .map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote))
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({ type: 'VOTE', payload: anecdote.content })
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>Anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <NContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    </NContext.Provider>
  )
}

export default App
