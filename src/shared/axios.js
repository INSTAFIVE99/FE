import Cookies from "universal-cookie";
import axios from "axios";
axios.defaults.withCredentials = true;


export const instance = axios.create({
  baseURL: "http://13.124.136.171/",

  headers: {
    "content-type": "application/json;charset=UTF-8",
  },
});

//헤더에 토큰 보내기
instance.interceptors.request.use(function (config) {
  const cookies = new Cookies();
  const token = cookies.get("myJwt");
  config.headers.common["Authorization"] = `${token}`;    //확인 필요
  return config;
});

export const apis = {

  postGet: () => instance.get("/api/posts"),       

  postOne: (postId) => instance.get(`/api/posts/${postId}`),

  postLike: (postId) => instance.post(`/api/${postId}/like`),



};
