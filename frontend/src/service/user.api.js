import axios from 'axios'
const serverUrl = 'http://localhost:5000/api'

export const getme = async () => {
    try {
        const res = await axios.get(serverUrl + '/auth/get-profile', {
            withCredentials: true
        })

        const data = await res.data

        return data.user
    } catch (err) {
        console.log(err.message)
    }
}

export const updateProfile = async (formdata) => {
    try {
        const res = await axios.patch(serverUrl + "/user/profile", formdata, {withCredentials: true})

        const data = res.data.user

        return data;
    } catch (err) {
        console.log(err.message)
    }
}

export const OtherUsers = async() =>{
    try{
        const res = await axios.get(serverUrl + "/user/otherusers", {withCredentials: true})
        return res.data.otherUsers
    }catch(err){
        console.log(err.message)
    }
}

export const searchUsersApi = async(input) =>{
    try{
        const res = await axios.get(serverUrl + `/user/search?query=${input}`, {withCredentials : true})
        return res.data
    }catch(err){
        return err.message
    }
}