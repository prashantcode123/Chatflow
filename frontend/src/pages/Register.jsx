import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeClosed } from 'lucide-react'
import { register } from '../service/auth.api.js'
import {useDispatch, useSelector} from 'react-redux'
import { setUserData } from '../redux/userSlice.js'


const Register = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  let dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await register(username, email, password)
    if (data) {
      dispatch(setUserData(data.user))
      navigate("/profile")
      setUsername("")
      setEmail("")
      setPassword("")
    }
  }

  return (
    <div className='bg-blue-100 w-full h-screen flex justify-center items-center'>
      <div className='w-full max-w-[530px] h-[650px] shadow-gray-400 bg-white rounded-2xl'>

        <h1 className='capitalize w-full text-center text-[1.5rem] font-semibold border-b-[1px] border-gray-400 text-gray-700 p-2 py-3'>
          welcome to
          <span className='text-blue-500 text-3xl tracking-wide'> chatflow</span>
        </h1>

        <span className='block pl-6 pt-2 text-blue-700 text-xl uppercase tracking-widest'>
          Register</span>

        <form onSubmit={handleSubmit} className='w-full flex justify-center items-center flex-col gap-[0.5rem] mt-5 p-4 md:px-10'>
          {/* username */}
          <div className='w-full flex flex-col p-[5px]'>
            <span className='text-lg tracking-wide pl-2 text-gray-700'>Username</span>
            <input autoComplete='off' required onChange={e => {
              setUsername(e.target.value)
            }} id='username' value={username} type="text" className='w-full px-5 py-3 text-xl rounded-xl border-[1px] outline-blue-400 border-gray-300' placeholder='Enter username...' />
          </div>

          {/* email */}
          <div className='w-full flex flex-col p-[5px]'>
            <span className='text-lg tracking-wide pl-2 text-gray-700'>Email</span>
            <input autoComplete='nope' required onChange={e => {
              setEmail(e.target.value)
            }} id='email' value={email} type="email" className='w-full px-5 py-3 text-xl rounded-xl border-[1px] outline-blue-400 border-gray-300' placeholder='Enter your email...' />
          </div>

          {/* password */}
          <div className='w-full flex flex-col p-[5px] relative'>
            <span className='text-lg tracking-wide pl-2 text-gray-700'>Password</span>
            <input required onChange={e => {
              setPassword(e.target.value)
            }} id='password' value={password} type={`${show ? 'text' : 'password'}`} className='w-full px-5 py-3 text-xl rounded-xl border-[1px] outline-blue-400 border-gray-300' placeholder='Enter your password...' />
            <div
              onClick={() => {
                setShow(show ? false : true)
              }}
              className='cursor-pointer w-fit absolute top-[50%] right-[5%] bg-white text-gray-600'>
              {show ? <Eye /> : <EyeClosed />}
            </div>
          </div>

          <button className='w-full bg-blue-500 text-gray-100 py-2 rounded-xl cursor-pointer active:scale-95 text-2xl font-semibold my-[10px] mt-[1.2rem] tracking-wide' onSubmit={handleSubmit}>Register</button>
        </form>

        <span className='w-full block text-center text-lg text-gray-700 tracking-wide mt-[1rem]'>
          If you have a account then <Link to={'/login'} className='text-blue-500'>LogIn</Link>
        </span>
      </div>
    </div>
  )
}

export default Register