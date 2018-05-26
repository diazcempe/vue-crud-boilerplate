import axios from 'axios'

const instance = axios.create({
    baseURL: "https://vue-crud-boilerplate.firebaseio.com/"
})

export default instance;