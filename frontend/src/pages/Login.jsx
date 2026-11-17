import { Eye, EyeClosed } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../service/auth.api'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  let dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await login(email, password)
    if (data) {
      dispatch(setUserData(data.user))
      window.location.reload()
      navigate("/")
      setEmail("")
      setPassword("")
    }
  }

  return (
    <div className='bg-blue-100 w-full h-screen flex justify-center items-center'>
      <div className='w-full max-w-[530px] h-[650px] shadow-gray-400 bg-white rounded-2xl'>

        <h1 className='capitalize w-full text-center text-[1.5rem] font-semibold border-b-[1px] border-gray-400 text-gray-700 p-2 py-3'>
          welcome back to
          <span className='text-blue-500 text-3xl tracking-wide'> chatflow</span>
        </h1>

        <span className='block pl-6 pt-2 text-blue-700 text-xl uppercase tracking-widest'>
          LogIn</span>

        <form
          onSubmit={handleSubmit}
          className='w-full flex justify-center items-center flex-col gap-[0.5rem] mt-5 p-4 md:px-10'>

          {/* email */}
          <div className='w-full flex flex-col p-[5px]'>
            <label htmlFor="" className='text-lg tracking-wide pl-2'>Email</label>
            <input required
              onChange={(e) => { setEmail(e.target.value) }} value={email}
              type="email" className='w-full px-5 py-3 text-lg rounded-xl border-[1px] outline-blue-400 border-gray-300' placeholder='Enter your email...' />
          </div>

          {/* password */}
          <div className='w-full flex flex-col p-[5px] relative'>
            <label htmlFor="" className='text-lg tracking-wide pl-2'>Password</label>
            <input required autoComplete='off'
              onChange={(e) => { setPassword(e.target.value) }} value={password}
              type={`${show ? 'text' : 'password'}`} className='w-full px-5 py-3 text-lg rounded-xl border-[1px] outline-blue-400 border-gray-300' placeholder='Enter your password...' />
            <div
              onClick={() => {
                setShow(show ? false : true)
              }}
              className='cursor-pointer w-fit absolute top-[50%] right-[5%] bg-white text-gray-600'>
              {show ? <Eye /> : <EyeClosed />}
            </div>
          </div>

          <button className='w-full bg-blue-500 text-gray-100 py-2 rounded-xl cursor-pointer active:scale-95 text-2xl font-semibold my-[10px] mt-[1.2rem] tracking-wide'>LogIn</button>
        </form>

        <span className='w-full block text-center text-lg text-gray-700 tracking-wide mt-[1rem]'>
          If you don't have any account then <Link to={'/register'} className='text-blue-500'>Register</Link>
        </span>
      </div>
    </div>
  )
}

export default Login