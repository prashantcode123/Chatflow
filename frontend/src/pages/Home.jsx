import React from 'react'
import { logout } from '../service/auth.api'
import Sidebar from '../components/Sidebar'
import MessageArea from '../components/MessageArea'
import getMessages from '../hooks/getMessages'

const Home = () => {
  getMessages()
  return (
    <div className='w-full h-screen flex'>
        <Sidebar />
        <MessageArea />
    </div>
  )
}

export default Home