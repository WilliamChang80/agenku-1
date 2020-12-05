import axios from "axios"
import {API} from "../config/api.config"

export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("userInfo")
    ? JSON.parse(window.localStorage.getItem("userInfo"))
    : {}


export const setUser = user =>
  window.localStorage.setItem("userInfo", JSON.stringify(user))


export const  login = (credentials) => {
    const promise = new Promise((resolve, reject) => {
      axios.post(`${API.BASE_URL}/auth/login`, credentials).then(
        (res) => {
          setUser(res.data)
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
    return promise;
}

export const register = (credentials) => {
  const promise = new Promise((resolve, reject) => {
    axios.post(`${API.BASE_URL}/auth/register`, credentials,{headers: { Mode: "no-cors" }}).then(
      (res) => {
        setUser(res.data)
        resolve(res.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
  return promise;
}

export  const getAuthHeader= () => {
  return { 'Authorization': `Bearer ${getUser().data.token}`};
}

export const isLoggedIn = () => {
  const user = getUser()

  return !!user.data
}

export const logout = () => {
  localStorage.removeItem('userInfo')
  localStorage.clear()
}