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
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["Authorization"] = `Bearer ${accessToken}`;    //확인 필요
  return config;
});

export const apis = {
//   signup: (userId, password, confirmPassword, nickName) =>
//     instance.post("/user/join", {
//       userId: userId,
//       password: password,
//       confirmPassword: confirmPassword,
//       nickName: nickName,
//     }),
//   login: (id, pwd) =>
//     instance.post("/user/login", { userId: id, password: pwd }),

//   auth: () => instance.get("/user/auth"),

  postGet: () => instance.get("/api/posts"),       //api/붙여야됨!

  postOne: (postId) => instance.get(`/api/posts/${postId}`),

//   postWrite: (title, content) =>
//     instance.post("/post", { title: title, content: content }),

//   postEdit: (postId, title, content) =>
//     instance.patch(`/post/${postId}`, { title: title, content: content }),

//   postDelete: (postId) => instance.delete(`/post/${postId}`),

//   addLike: (postId) => instance.patch(`/post/like/${postId}`),

//   addUnlike: (postId) => instance.patch(`/post/unlike/${postId}`),

//   commentAdd: (postId, content) =>
//     instance.post(`/post/${postId}/comment`, { content: content }),

//   commentUp: (postId, content, commentId) =>
//     instance.patch(`/post/${postId}/comment`, {
//       commentId: commentId,
//       content: content,
//     }),

//   commentDle: (postId, commentId) =>
//     instance.put(`/post/${postId}/comment`, { commentId: commentId }),
};
