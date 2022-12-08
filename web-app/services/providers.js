import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/';

class HTTP {
  constructor() {
  }

  static get(url, params) {
	return axios.get(BASE_URL + url, { params });
  }

  static post(url, data) {
	return axios.post(BASE_URL + url, data);
  }

  static put(url, data) {
	return axios.put(BASE_URL + url, data);
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
		return HTTP.post('signin', data);
	}

	// register
	static async register(data) {
		return HTTP.post('user', data);
	}

  	// reddit
  
	// connect reddit
	static async connectReddit() {
	  return HTTP.get('auth/reddit');
	}

	//refresh token reddit
	static async refreshTokenReddit() {
		return HTTP.get('auth/reddit/refresh');
	}

	// get suer posts
	static async getUserRedditPosts() {
		return HTTP.get('/user/reddit/posts/' + userId, { 'filter': 'all' });
	}

	// get user subs
	static async getUserRedditSubs() {
		return HTTP.get('/user/reddit/subs/' + userId);
	}

	// twitter

	// connnect twitter
	static async connectTwitter() {
		return HTTP.get('auth/twitter');
	}

	// get user
	static async getUserTwitter() {
		return HTTP.get('twitter/user');
	}
}