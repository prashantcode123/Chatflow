import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import dp from '../../public/empty_dp.png'
import { LogOut, Search, X } from 'lucide-react'
import { logout } from '../service/auth.api'
import { setSearchData, setSelectedUser } from '../redux/userSlice'
import { searchUsersApi } from '../service/user.api.js'

const Sidebar = () => {

    const { userData, otherUsers, onlineUsers } = useSelector(state => state.user)
    const [searchShow, setSearchShow] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let { selectedUser, searchData } = useSelector(state => state.user)

    const handleSearchUsers = async () => {
        const data = await searchUsersApi(searchInput)
        dispatch(setSearchData(data))
    }

    useEffect(() => {
        if (searchInput) {
            handleSearchUsers()
        }
    }, [searchInput])


    return (
        <div className={`relative h-screen w-full ${!selectedUser ? "block" : "hidden"} md:block md:w-[40%] lg:w-[30%] bg-slate-200 border-r-[1px] border-gray-400 flex flex-col`}>

            <div className='w-full h-[11rem] relative bg-blue-400 border-b-2 border-blue-300 rounded-b-xl shadow-xl shadow-gray-300'>

                <div className='flex justify-between px-4 pt-4 w-full relative'>
                    <h1 className='w-fit text-2xl font-bold text-gray-100 tracking-wider'>
                        Chat
                        <span className=''>Flow</span></h1>
                    <img
                        onClick={(e) => { navigate('/profile') }}
                        className='w-[55px] h-[55px] cursor-pointer rounded-full object-cover shadow-lg shadow-gray-500 bg-white absolute right-10 top-6'
                        src={userData.image ? userData.image : dp} alt="" />
                </div>

                <h3 className='px-5 text-2xl text-gray-800 font-semibold'>Hello , {userData.name ? userData.name : "user"}</h3>

                <div className='w-full flex items-center pl-4 p-4 mt-2 gap-2'>
                    <div
                        onClick={() => { setSearchShow(true) }}
                        className={`bg-gray-50 p-3 rounded-full text-gray-800 cursor-pointer ${searchShow ? "hidden" : ""}`}>
                        <Search />
                    </div>

                    {/* search input */}
                    <div className={`flex bg-gray-50 items-center w-full rounded-2xl ${searchShow ? "" : "hidden"}`}>
                        <div className='bg-gray-50 p-3 rounded-full text-gray-800 cursor-pointer'>
                            <Search />
                        </div>
                        <div className='flex-1 text-lg'>
                            <input
                                onChange={(e) => { setSearchInput(e.target.value) }} value={searchInput}
                                className='outline-none w-full' type="text" placeholder='search user...' />
                        </div>

                        <X
                            onClick={() => {
                                setSearchShow(false)
                                setSearchInput('')
                            }}
                            className='w-[30px] h-[30px] cursor-pointer pr-2 text-gray-700' />

                    </div>

                    {/* Active users horizontal slider */}
                    <div className={`w-full overflow-x-auto scrollbar-hide ${searchShow ? "hidden" : ""}`}>
                        <div className="flex flex-nowrap gap-4 w-max">
                            {otherUsers?.map((users, idx) => {
                                return (onlineUsers?.includes(users._id) &&

                                    <div onClick={() => { dispatch(setSelectedUser(users)) }}
                                        key={idx} className="cursor-pointer relative shrink-0 rounded-full">
                                        <img
                                            className="w-[45px] h-[45px] rounded-full object-cover shadow-xl bg-white"
                                            src={users?.image || dp}
                                            alt="Active user"
                                        />
                                        <div className="absolute right-0 bottom-1 w-[10px] h-[10px] bg-green-400 border-2 border-white rounded-full"></div>
                                    </div>)

                            })}

                        </div>
                    </div>

                </div>

                {/* search userlist */}
                {searchData && searchInput.length > 0 && (<div className='flex flex-col items-center w-[100%] h-screen overflow-y-auto overflow-x-hidden bg-gray-50 absolute top-[100%] p-4'>
                    {searchData?.map((user, idx) => {
                        return (
                            <div
                                onClick={() => {
                                    dispatch(setSelectedUser(user))
                                    setSearchInput("")
                                    setSearchShow(false)
                                }}
                                key={idx} className='w-full border-b-2 border-gray-400 flex items-center gap-[1rem] cursor-pointer hover:bg-gray-200 bg-gray-50 p-2'>
                                <div className="rounded-full bg-white">
                                    <img
                                        className="w-[55px] h-[55px] rounded-full object-cover shadow-xl"
                                        src={user?.image || dp}
                                        alt="Active user"
                                    />
                                </div>
                                <h2 className='text-2xl text-gray-800 font-semibold tracking-wide'>{user.username}</h2>
                            </div>
                        )
                    })}
                </div>)}


            </div>

            {/* Users List */}
            <div className='w-full h-[68%] overflow-y-auto flex-1 p-4 mt-4 flex flex-col gap-4'>
                {otherUsers?.map((user, idx) => {
                    return (
                        <div
                            onClick={() => { dispatch(setSelectedUser(user)) }}
                            key={idx} className='w-full rounded-3xl bg-gray-50 shadow-2xl shadow-gray-500 flex items-center gap-[1rem] cursor-pointer md:hover:scale-[102%]'>
                            <div className="rounded-full bg-white">
                                <img
                                    className="w-[55px] h-[55px] rounded-full object-cover shadow-xl"
                                    src={user?.image || dp}
                                    alt="Active user"
                                />
                            </div>
                            <h2 className='text-2xl text-gray-800 font-semibold tracking-wide'>{user.username}</h2>
                        </div>
                    )
                })}
            </div>




            {/* logout */}
            <button
                onClick={async () => {     
                     const success = await logout();
                    console.log(success);
                    if (success) {
                       dispatch(setUserData(null));
                       dispatch(setOtherUsers(null));
                       navigate("/login", { replace: true });
                }
             }}
                className='rotate-180 cursor-pointer absolute bottom-6 left-4 bg-blue-400 text-gray-50 p-4 rounded-full outline-none shadow-2xl shadow-gray-600'>
                <LogOut />
            </button>
        </div>
    )
}

export default Sidebar
