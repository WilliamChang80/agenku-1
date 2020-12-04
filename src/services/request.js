import axios from "axios"
import {API} from "../config/api.config"
import {getAuthHeader} from "./auth"

const hadleGet = (endpoint) => {
  const promise = new Promise((resolve, reject) => {
    axios.get(`${API.BASE_URL}${endpoint}`, getAuthHeader()).then(
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

const hadlePost = (endpoint,data) => {
  const promise = new Promise((resolve, reject) => {
    axios.post(`${API.BASE_URL}${endpoint}`,data, getAuthHeader()).then(
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

const hadlePut = (endpoint,data) => {
  const promise = new Promise((resolve, reject) => {
    axios.put(`${API.BASE_URL}${endpoint}`,data, getAuthHeader()).then(
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

const hadlePatch = (endpoint,data) => {
  const promise = new Promise((resolve, reject) => {
    axios.patch(`${API.BASE_URL}${endpoint}`,data, getAuthHeader()).then(
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

const hadleDelete = (endpoint,data) => {
  const promise = new Promise((resolve, reject) => {
    axios.delete(`${API.BASE_URL}${endpoint}`, getAuthHeader()).then(
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