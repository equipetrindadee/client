import axios from 'axios'

export default axios.create({
    baseURL: 'https://server-pytv.onrender.com'
    // baseURL: 'http://localhost:8181'
})