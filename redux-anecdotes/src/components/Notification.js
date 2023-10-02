import { useDispatch, useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(({ notification }) => {
    return notification
  })
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const showNotification = () => {
    if (notification !== '') {
      return (
        <div style={style}>
          {notification}
        </div>
      )
    }
    return
  }

  return (
    <div>
      {showNotification()}
    </div>
  )
}

export default Notification