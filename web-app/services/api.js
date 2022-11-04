import axios from 'axios'

const baseUrl = 'http://localhost:3000/api'

class http {
    constructor() {
    }
    static async post(url, data={}) {
        return await axios.post(`${baseUrl}${url}`, data)
    }
}

export class api {
    constructor () {

    }
    static async signIn(email, password) {
        return await http.post('/signin', {email:email, password:password})
    }

    static async user(email, password) {
        return await http.post('/user', {email:email, password:password})
    }
}

export default api