import axios from './axiosService';

export const signupService = data => {
	return axios.post('/api/auth/signup', data);
};

export const loginService = data => {
	return axios.post('/api/auth/login', data);
};
