import axios from 'axios'
const serverUrl = 'https://chatflow-gwxx.onrender.com/api'

export const register = async (username, email, password) => {
    try {
        const res = await axios.post(serverUrl + '/auth/register', {
            username, email, password
        }, {
            withCredentials: true
        })

        const data = await res.data

        return data
    } catch (err) {
        alert(err.response.data.message)
    }
}

export const login = async (email, password) => {
    try {
        const res = await axios.post(serverUrl + '/auth/login', {
            email, password
        }, {
            withCredentials: true
        })

        const data = await res.data

        return data.user
    } catch (err) {
        alert(err.response.data.message)
    }
}

export const logout = async () => {
    try {
        const res = await axios.get(serverUrl + '/auth/logout', {
            withCredentials: true
        })

        const data = await res.data

        return data.success
    } catch (err) {
        console.log(err.message)
    }
}

