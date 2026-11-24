import React from 'react'
import { deleteAccount } from '../service/user.api'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setOnlineUsers, setUserData } from '../redux/userSlice'



const DeleteModal = ({setModal}) => {

  const dispatch = useDispatch()
  const handleAccountDelte = async() => {
  try{
    await deleteAccount()
    await LogOut()
    dispatch(setUserData(null))
    dispatch(setOnlineUsers(null))
    useNavigate("/login")
  }catch(err){
    console.log(err.message)
  }
 }
  return (
    <div className='w-full h-screen relative bg-blue/50 backdrop-blur-lg p-6'>

      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-[700px] bg-gray-50 p-6 rounded-xl shadow-md shadow-gray-400 flex flex-col gap-4">
        <p className='text-gray-800 text-xl'>Are you sure you want to delete this Account? this action cannot be undone.</p>
        <div className='self-end flex gap-4'>
          <button 
          onClick={handleAccountDelte}
          className="bg-red-500 text-white px-4 py-2 rounded-lg md:hover:bg-red-600 cursor-pointer text-xl active:scale-95">Delete</button>
          <button
          onClick={() => { setModal(false) }}
           className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg md:hover:bg-gray-400 cursor-pointer text-xl active:scale-95">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal