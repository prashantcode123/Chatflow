import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/register.jsx'
import Login from './pages/Login.jsx'
import getCurrentUser from './hooks/getCurrentUser.jsx'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import getOtherUsers from './hooks/getOtherUsers.jsx'
import { io } from 'socket.io-client'
import { useEffect } from 'react'
import { setOnlineUsers, setSocket } from './redux/userSlice.js'

const App = () => {
  getCurrentUser()
  getOtherUsers()
  let { userData, socket, onlineUsers } = useSelector(state => state.user)
  let dispatch = useDispatch()

  useEffect(() => {
    if (userData) {
      const socket = io("http://localhost:5000", {
        query: {
          userId: userData?._id
        },
        autoConnect: false,
        withCredentials: true
      })

      dispatch(setSocket(socket))

      socket.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users))
      })
      return () => { socket.close() }
    } else {
      if (socket) {
        socket.close()
        dispatch(setSocket(null))
      }
    }
  }, [userData])



  return (
    <Routes>
      <Route path='/' element={userData ? <Home /> : <Navigate to="/login" />} />
      <Route path='/profile' element={userData ? <Profile /> : <Navigate to='/register' />} />
      <Route path='/register' element={!userData ? <Register /> : <Navigate to="/profile" />} />
      <Route path='/login' element={!userData ? <Login /> : <Navigate to="/" />} />
    </Routes>
  )
}

export default App