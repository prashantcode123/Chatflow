import axios from 'axios'
const serverUrl = 'https://chatflow-gwxx.onrender.com/api'

export const sendMessage = async (formData, receiverId) => {
    try {
        const res = await axios.post(serverUrl + `/message/send/${receiverId}` , formData, {
            withCredentials: true
        })

        const data = await res.data

        return data
    } catch (err) {
        console.log(err.message)
    }
}

export const getMessage = async (receiverId) => {
    try {
        const res = await axios.get(serverUrl + `/message/get/${receiverId}`, {
            withCredentials: true
        })

        const data = await res.data

        return data
    } catch (err) {
        console.log(err.message)
    }
}
