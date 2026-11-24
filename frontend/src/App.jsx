
import React, { createContext, useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import getCurrentUser from './hooks/getCurrentUser.jsx'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import getOtherUsers from './hooks/getOtherUsers.jsx'
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
import { setOnlineUsers } from './redux/userSlice.js'


export const SocketContext = createContext(null)

export const useSocket = () => useContext(SocketContext)

const App = () => {
  getCurrentUser()
  getOtherUsers()

  let { userData } = useSelector(state => state.user)
  let dispatch = useDispatch()

  const [socket, setSocket] = useState(null)

  useEffect(() => {
    if (userData) {

      const socket = io(
        import.meta.env.MODE === "production"
          ? import.meta.env.VITE_SERVER_URL
          : "http://localhost:5000",
        {
          query: {
            userId: userData._id
          },
          withCredentials: true,
          transports: ["polling", "websocket"]
        }
      )

      setSocket(socket)

      socket.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users))
      })

      return () => {
        socket.disconnect()
        setSocket(null)
      }
    }
  }, [userData?._id, dispatch])

  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        <Route path='/' element={userData ? <Home /> : <Navigate to="/login" />} />
        <Route path='/profile' element={userData ? <Profile /> : <Navigate to='/register' />} />
        <Route path='/register' element={!userData ? <Register /> : <Navigate to="/profile" />} />
        <Route path='/login' element={!userData ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </SocketContext.Provider>
  )
}

export default App
