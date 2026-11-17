import { useEffect } from "react"
import { getme } from "../service/user.api.js"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice"

const getCurrentUser = () => { 
    let dispatch = useDispatch()
    let {userData} = useSelector(state => state.user)
    useEffect(() => {
      const fetchUser = async() =>{
        const data = await getme()
        dispatch(setUserData(data))
      }
      fetchUser()
    }, [])
    
 }

export default getCurrentUser