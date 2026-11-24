
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import getCurrentUser from './hooks/getCurrentUser.jsx'
import { useSelector } from 'react-redux'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import getOtherUsers from './hooks/getOtherUsers.jsx'
import { io } from 'socket.io-client'

// Create Context
export const SocketContext = createContext(null);

// Custom Hook
export const useSocket = () => useContext(SocketContext);

const App = () => {
    getCurrentUser()
    getOtherUsers()

    const { userData } = useSelector(state => state.user)
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        if (!userData?._id) {
            setSocket(null)
            return
        }

        const newSocket = io(
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

        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
            setSocket(null)
        }
    }, [userData?._id])

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
