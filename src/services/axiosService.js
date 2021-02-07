import axios from 'axios';
import queryString from 'query-string';

const { access } = queryString.parse(window.location.search);
const token = sessionStorage.getItem('token');

export default axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		authorization: token ? `Bearer ${token}` : `Bearer ${access}`,
		'Access-Control-Allow-Origin': '*',
		contentType: 'aplication/json',
		accept: 'application/json',
	},
});
