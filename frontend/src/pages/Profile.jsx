import { Camera, MoveLeft } from 'lucide-react'
import React from 'react'
import dp from '../../public/empty_dp.png'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useState } from 'react'
import { updateProfile } from '../service/user.api.js'
import { setUserData } from '../redux/userSlice'
import DeleteModal from '../components/DeleteModal.jsx'

const Profile = () => {
  let { userData } = useSelector(state => state.user)
  const navigate = useNavigate()
  const [name, setName] = useState(userData.name || "")
  const [frontendImage, setFrontendImage] = useState(userData.image || dp)
  const [backendImage, setbackendImage] = useState(null)
  const [save, setSave] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  let image = useRef()
  let dispatch = useDispatch()


  const handleImage = (e) => {
    const file = e.target.files[0]
    const imageUrl = URL.createObjectURL(file)
    setbackendImage(file)
    setFrontendImage(imageUrl)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSave(true)
      let formData = new FormData()
      formData.append("name", name)
      if (backendImage) {
        formData.append("image", backendImage)
      }

      const data = await updateProfile(formData)
      setSave(false)
      dispatch(setUserData(data))
    } catch (err) {
      setSave(false)
      console.log(err)
    }
  }

  return (
    <div className='w-full h-screen bg-blue-100 flex justify-center items-center'>

      {modalShow && <div className={`w-full h-screen absolute z-50`}>
        <DeleteModal setModal={setModalShow} />
      </div>}
      
      <div className='relative w-full max-w-[550px] h-[650px] bg-white rounded-xl shadow-2xl shadow-gray-400 flex flex-col justify-start items-center gap-[10px]'>

        <MoveLeft onClick={() => { navigate("/") }} className='absolute left-4 top-2 text-gray-600 cursor-pointer z-10' />
        <input type="file" hidden accept='image/*' ref={image} onChange={handleImage} />

        <form onSubmit={handleSubmit} className='w-full h-full p-[1rem] flex flex-col justify-center items-center relative'>
          <div
            onClick={(e) => { image.current.click() }}
            className='w-[170px] h-[170px] overflow-hidden border-4 border-blue-500 shadow-2xl rounded-[50%]'>
            <img src={frontendImage} className='h-full w-full object-cover' />
            <Camera className='absolute right-[28%] md:right-[35%] top-[25%] bg-gray-200 rounded-[50%] cursor-pointer w-[35px] h-[35px] p-1 text-gray-800' />
          </div>

          <div className='mt-[2rem] w-full p-[1rem] md:p-[2rem] flex flex-col gap-[2rem]'>
            <input
              onChange={(e) => { setName(e.target.value) }} value={name}
              className='p-4 w-full bg-gray-100 shadow-xl border-[1px] border-gray-400 rounded-lg outline-blue-400'
              type="text" placeholder='Enter name..' />

            <input className='p-4 w-full bg-gray-100 shadow-xl rounded-lg outline-blue-400 border-[1px] border-gray-400 text-gray-600'
              type="text" readOnly value={userData.username} />

            <input className='p-4 w-full bg-gray-100 shadow-xl rounded-lg outline-blue-400 border-[1px] border-gray-400 text-gray-600'
              type="text" readOnly value={userData.email} />
          </div>

          <div className='mt-2 flex self-end gap-[20px] pr-[20px] md:pr-[30px]'>
            <button
              className='bg-blue-500 tracking-wide text-white font-semibold text-xl cursor-pointer px-6 py-2 rounded-lg active:scale-95'>
              {save ? "Saving..." : "Save"}
            </button>
            <button 
            onClick={(e) => {
              e.preventDefault() 
              setModalShow(true) }}
            className='bg-red-500 tracking-wide text-white font-semibold text-xl cursor-pointer px-6 py-2 rounded-lg active:scale-95'>
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile