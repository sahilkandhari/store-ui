import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://store-ui.firebaseio.com'
})

export default instance