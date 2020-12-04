import axios from "axios"
import {API} from "../config/api.config"
import {getAuthHeader} from "./auth"

export const handleGet = (endpoint, isPrivate) => {
  const promise = new Promise((resolve, reject) => {
    axios.get(`${API.BASE_URL}${endpoint}`,{ headers: isPrivate ? getAuthHeader() : {} }).then(
      (res) => {
        resolve(res.data);
      },
      (err) => {
        reject(err);
      }
    )
  });
  return promise;
}

export const handlePost = (endpoint,data,isPrivate) => {
  const promise = new Promise((resolve, reject) => {
    axios.post(`${API.BASE_URL}${endpoint}`,data, isPrivate?  getAuthHeader() : {headers : {mode: 'no-cors'}}).then(
      (res) => {
        resolve(res.data);
      },
      (err) => {
        reject(err);
      }
    )
  });
  return promise;
}

export const handlePut = (endpoint,data,isPrivate) => {
  const promise = new Promise((resolve, reject) => {
    axios.put(`${API.BASE_URL}${endpoint}`,data, isPrivate?  getAuthHeader() : {headers : {mode: 'no-cors'}}).then(
      (res) => {
        resolve(res.data);
      },
      (err) => {
        reject(err);
      }
    )
  });
  return promise;
}

export const handlePatch = (endpoint,data, isPrivate) => {
  const promise = new Promise((resolve, reject) => {
    axios.patch(`${API.BASE_URL}${endpoint}`,data, isPrivate?  getAuthHeader() : {headers : {mode: 'no-cors'}}).then(
      (res) => {
        resolve(res.data);
      },
      (err) => {
        reject(err);
      }
    )
  });
  return promise;
}

export const handleDelete = (endpoint,data, isPrivate) => {
  const promise = new Promise((resolve, reject) => {
    axios.delete(`${API.BASE_URL}${endpoint}`, isPrivate?  getAuthHeader() : {headers : {mode: 'no-cors'}}).then(
      (res) => {
        resolve(res.data);
      },
      (err) => {
        reject(err);
      }
    )
  });
  return promise;
}