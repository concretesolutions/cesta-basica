import axios from 'axios'

export const Api = axios.create({
  baseURL: process.env.REACT_APP_APIHOST || '/',
})

Api.interceptors.request.use(
  function(config) {
    config.headers["Access-Control-Allow-Origin"] = process.env.CORS_WEBSITE
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export function setToken(token) {
  if (token) {
    Api.defaults.headers['x-access-token'] = token
  }
}
