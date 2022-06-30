import axios from 'axios'
require('dotenv').config()

const TWITTER_API_BASE_URL = 'https://api.twitter.com/'

class Http {
  constructor() {}

  static async get(url, params = {}) {
    return await axios.get(url, { params: params })
  }

  static async post(url, params = {}) {
    return await axios.post(url, { params: params })
  }

  static async put(url, params = {}) {
    return await axios.put(url, { params: params })
  }

  static async delete(url, params = {}) {
    return await axios.delete(url, { params: params })
  }
}

export class Api {
  constructor() {}
}
