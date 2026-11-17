import React, { useRef, useState } from 'react'
import dp from '../../public/empty_dp.png'
import { FaceSlightlySmiling, ImagePlus, MoveLeft, Send } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../redux/userSlice'
import EmojiPicker from 'emoji-picker-react';
import SenderMessage from './SenderMessage'
import ReceiverMessage from './ReceiverMessage'
import { sendMessage } from '../service/messages.api'
import { setMessages } from '../redux/messageSlice'
import { useEffect } from 'react'

const MessageArea = () => {

  let { selectedUser, userData, socket } = useSelector(state => state.user)
  let { messages } = useSelector(state => state.message)
  let dispatch = useDispatch()
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [frontendImage, setFrontendImage] = useState(null)
  const [backendImage, setBackendImage] = useState(null)
  let image = useRef()

  const onEmojiClick = (emojiData) => {
    setInputMessage(inputMessage + emojiData.emoji)
    setShowEmojiPicker(false)
  }

  const handleImage = (e) => {
    let file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if(inputMessage.length == 0){
      return null
    }
    let formData = new FormData()
    formData.append("message", inputMessage)
    if (backendImage) {
      formData.append("image", backendImage)
    }

    const data = await sendMessage(formData, selectedUser._id)
    dispatch(setMessages([...messages, data]))

    setInputMessage('')
    setFrontendImage(null)
    setBackendImage(null)
  }

  useEffect(() => {
    socket.on("newMessage", (mess) => { 
      dispatch(setMessages([...messages,mess]))
     })

     return ()=>socket.off("newMessage")
  }, [messages, setMessages])
  

  return (
    <div className={`w-full relative md:block md:flex-1 max-h-[100vh] bg-slate-300 ${selectedUser ? "block" : "hidden"} `}>

      {selectedUser && <div className='w-full h-[5rem] bg-blue-800 rounded-b-xl shadow-2xl shadow-gray-400 overflow-hidden flex items-center p-4 gap-[14px]'>
        <MoveLeft
          onClick={() => { dispatch(setSelectedUser(null)) }}
          className='text-white w-[30px] h-[30px] cursor-pointer' />
        <img src={selectedUser?.image || dp} className='w-[50px] h-[50px] rounded-full shadow-2xl shadow-gray-500 object-center object-cover' />
        <h2 className='text-2xl text-white font-semibold'>{selectedUser?.name || "username"}</h2>
      </div>}

      {!selectedUser && <div className='w-full h-full flex justify-center items-center flex-col gap-2'>
        <h1 className='text-3xl md:text-5xl font-bold text-gray-800 capitalize tracking-wide text-center'>welcome to chatFlow</h1>
        <h2 className='text-xl md:text-2xl font-semibold text-gray-800'>start your chats...</h2>
      </div>}

      {selectedUser && <div className='w-full h-[75%] md:h-[80%]'>
        <div className='z-30 absolute bottom-5 md:bottom-5 w-full flex justify-center text-gray-800 p-2'>
          <input type="file" className='hidden' accept='image/*' ref={image} onChange={handleImage} />
          <form onSubmit={handleSendMessage} className='flex p-2 md:p-2.5 gap-[10px] rounded-3xl items-center w-full lg:w-[70%] border-2 border-blue-500 bg-gray-50 shadow-2xl shadow-gray-500'>
            <FaceSlightlySmiling className='cursor-pointer' onClick={e => setShowEmojiPicker(prev => !prev)} />
            <input
              onChange={(e) => { setInputMessage(e.target.value) }}
              value={inputMessage}
              type="text" placeholder='Message...' className='flex-1 p-2 outline-none text-lg md:text-xl' />
            <ImagePlus onClick={e => image.current.click()} className='cursor-pointer' />
            {inputMessage.length>0 && <button>
              <Send className='cursor-pointer' />
              </button>}
          </form>
          {showEmojiPicker && <div className='absolute bottom-[110%] left-[20px] md:left-[50px] z-50'>
            <EmojiPicker onEmojiClick={onEmojiClick} width={250} height={300} />
          </div>}

          {frontendImage && <div className='absolute bottom-[110%] right-[20px] md:right-[180px] z-40'>
            <img src={frontendImage} className='h-[90px] w-fit object-contain shadow-2xl shadow-gray-500 border-2 border-gray-100 rounded-lg' />
          </div>}
        </div>

        {/* chats div */}
        <div className='w-full h-full relative'>
          
          {/* message div */}
          <div className='p-2 h-full flex flex-col gap-[10px] overflow-y-auto pb-5'>
            {messages && messages.map((mess, idx) => {
              if (mess.sender == userData._id) return <SenderMessage key={idx} image={mess.image} message={mess.message} />
              else return <ReceiverMessage key={idx} image={mess.image} message={mess.message} />
            })}

          </div>
        </div>
      </div>}

    </div>
  )
}

export default MessageArea
