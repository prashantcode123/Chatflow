import React from 'react'
import dp from '../../public/empty_dp.png'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const SenderMessage = ({ image, message }) => {
  let scroll = useRef()
  const {userData} = useSelector(state=> state.user)
  useEffect(() => {
    scroll.current.scrollIntoView({ behaviour: "smooth" })
  }, [message, image])

  const handleImageScroll = () => {
    scroll.current.scrollIntoView({ behaviour: "smooth" })
  }

  return (
    <div className='flex gap-1 align-top self-end max-w-[80%] md:max-w-[45%]'>
      <div ref={scroll} className='w-fit  px-4 p-2 shadow-xl shadow-gray-500 rounded-xl rounded-tr-none leading-5 md:leading-6 bg-blue-800 text-white text-md md:text-xl tracking-wide'>
        {image && <img onLoad={handleImageScroll} className='w-fit ml-auto rounded-xl mb-4 self-end h-[120px] md:h-[170px] object-contain' src={image} />}
        {message && <p className='text-right'>{message}</p>}
      </div>
      <div className='w-[35px] h-[35px] shadow-xl shadow-gray-500 rounded-full overflow-hidden shadow-2xl shadow-gray-500'>
        <img className='w-full h-full object-center object-cover' src={userData?.image || dp} alt="" />
      </div>
    </div>
  )
}

export default SenderMessage