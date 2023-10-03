import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests' 
import { useContext } from 'react'
import NContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NContext)
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      queryClient.setQueryData({ queryKey: ['anecdotes'] }, anecdotes.concat(newAnecdote))
    },
    onError: () => {
      notificationDispatch({ type: 'ERROR', payload: 'Too short anecdote, must have length of 5 or more' })
      setTimeout(() => {
        notificationDispatch({ type: 'REMOVE', payload: '' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length >= 5) {
      newAnecdoteMutation.mutate({ content, votes: 0 })
      notificationDispatch({ type: 'CREATE', payload: content })
      setTimeout(() => {
      notificationDispatch({ type: 'REMOVE', payload: '' })
      }, 5000)
    } else {
      notificationDispatch({ type: 'ERROR', payload: 'Too short anecdote, must have length of 5 or more' })
      setTimeout(() => {
        notificationDispatch({ type: 'REMOVE', payload: '' })
      }, 5000)
    }
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
