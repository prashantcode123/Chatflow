import React from 'react'
import dp from '../../public/empty_dp.png'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const ReceiverMessage = ({ image, message }) => {
  let scroll = useRef()
  const { selectedUser } = useSelector(state => state.user)
  useEffect(() => {
    scroll.current?.scrollIntoView({
    behavior: "smooth"
});
  }, [message, image])

  const handleImageScroll = () => {
    scroll.current.scrollIntoView({ behaviour: "smooth" })
  }
  return (
    <div className='flex gap-1 align-top max-w-[80%] md:max-w-[45%]'>
      <div className='w-[35px] h-[35px] rounded-full overflow-hidden shadow-xl shadow-gray-500'>
        <img className='w-full h-full object-center object-cover' src={selectedUser?.image || dp} alt="" />
      </div>
      <div ref={scroll} className='w-fit  px-4 p-2 rounded-xl rounded-tl-none bg-blue-700 leading-5 md:leading-6 text-white text-md md:text-xl tracking-wide shadow-xl shadow-gray-500'>
        {image && <img onLoad={handleImageScroll} className='w-fit mr-auto mb-2 rounded-xl self-end h-[120px] md:h-[170px] object-contain' src={image} />}
        {message && <p className='text-left'>{message}</p>}
      </div>

    </div>
  )
}

export default ReceiverMessage
