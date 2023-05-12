import axios from 'axios'

const token= ""

export default axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: "Bearer ${token}",
    }
})