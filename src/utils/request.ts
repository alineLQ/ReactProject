import axios from "axios";
import { BASE, ID, KEY } from "@/config";
import store2 from "store2";
const instance = axios.create({
  baseURL: `${BASE}/1.1/`,
  headers: {
    "X-LC-Id": ID,
    "X-LC-Key": KEY,
    "Content-Type": "application/json",
  },
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // console.log("请求拦截器", config);
    if (config.url?.indexOf("users") != -1 && config.method == "put") {
      let info = store2.get("fx-admin-userinfo");
      config.headers["X-LC-Session"] = info.sessionToken;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;
