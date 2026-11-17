import { useEffect } from "react"
import { getme, OtherUsers } from "../service/user.api.js"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers } from "../redux/userSlice"

const getOtherUsers = () => {
  let dispatch = useDispatch()
    let {userData} = useSelector(state => state.user)
    useEffect(() => {
      const fetchUser = async() =>{
        const data = await OtherUsers()
        dispatch(setOtherUsers(data))
      }
      fetchUser()
    }, [])
}

export default getOtherUsers