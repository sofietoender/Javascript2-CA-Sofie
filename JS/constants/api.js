export const BASE_URL ="https://v2.api.noroff.dev";
export const socialUrl = `${BASE_URL}/social`
export const API_KEY_URL ="/auth/create-api-key";
export const API_AUTH_URL ="/auth/login"
export const accessToken = localStorage.getItem('accessToken');
export const apiKey = 'dae6ccc5-f86c-464a-b15b-c74239c9d85f'; // Your API key
export const postsUrl = `${socialUrl}/posts`; // Endpoint for posts
export const searchUrl = `${postsUrl}/search`; // Endpoint for search
export const profileName = localStorage.getItem('username'); // Get username from localStorage
export const profileUrl = `${socialUrl}/profiles/${profileName}`; // Endpoint for profile information
