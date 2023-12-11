import axios from 'axios'

export default axios.create({
    baseURL: 'https://retainplus.azurewebsites.net/',
    timeout: 500000,
    headers: {
        'Content-Type': 'application/json',
    }
})