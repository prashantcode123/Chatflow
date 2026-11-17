import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMessage } from "../service/messages.api"
import { setMessages } from "../redux/messageSlice"

const getMessages = async () => {
    const dispatch = useDispatch()
    const { selectedUser } = useSelector(state => state.user)
    useEffect(() => {
        if (selectedUser) {
            const fetchMessages = async () => {
                const data = await getMessage(selectedUser._id)
                dispatch(setMessages(data))
            }
            fetchMessages()
        }
    }, [selectedUser])

}

export default getMessages