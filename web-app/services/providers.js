import axios from 'axios'
require('dotenv').config()

const TWITTER_API_BASE_URL = 'https://api.twitter.com/'

class Http {
  constructor() {
    // this empty constructor is needed for the class to be instantiable
    // don't want a default constructor to be generated
  }

  static async get(url, params = {}) {
    return axios.get(url, { params: params })
  }

  static async post(url, params = {}) {
    return axios.post(url, { params: params })
  }

  static async put(url, params = {}) {
    return axios.put(url, { params: params })
  }

  static async delete(url, params = {}) {
    return axios.delete(url, { params: params })
  }
}

export class Api {
  constructor() {
    // this empty constructor is needed for the class to be instantiable
    // don't want a default constructor to be generated
  }
}
