import axios from 'axios';
import { useMainStore } from '../store/main';

// const BASE_URL = 'http://localhost:3001/api';
const BASE_URL = 'http://localhost:1234/api';
const BASE_URL_API_PREDICTION = 'http://localhost:8000';
const store = useMainStore();

class HTTP {
  constructor() {
  }

  static get(url, token) {
	return axios.get(BASE_URL + url, token ? { headers: { Authorization: token } } : null);
  }

  static post(url, data, token) {
	return axios.post(BASE_URL + url, data, token ? { headers: { Authorization: token } } : null );
  }

  static put(url, data, token) {
	return axios.put(BASE_URL + url, data, { headers: { Authorization: token } });
  }

  static delete(url) {
	return axios.delete(BASE_URL + url);
  }
}

export default class Providers {
	  constructor() {
	}

	// login
	static async login(data) {
		return HTTP.post('/signin', data);
	}

	// register
	static async register(data) {
		return HTTP.post('/user', data);
	}

	// get user
	static async getUser(userId, token) {
		return HTTP.get('/user/' + userId, token);
	}

	// update user
	static async updateUser(userId, data, token) {
		return HTTP.put('/user/update/' + userId, data, token);
	}

	// twitter

	// connnect twitter
	static async connectTwitter(token) {
		return HTTP.get('/auth/twitter', token);
	}

	// get token twitter
	static async getTokenTwitter(data, token) {
		return HTTP.post('/auth/twitter/callback', data, token);
	}

	// get user
	static async getUserTwitter(token) {
		return HTTP.get('/twitter/user', token);
	}

	// get tweets (home	timeline)
	static async getHomeTweets(token) {
		return HTTP.get('/twitter/user/home', token);
	}

	// get predictions
	static async getPredictions(data) {
		return axios.post(BASE_URL_API_PREDICTION + '/predicts', data);
	}

}