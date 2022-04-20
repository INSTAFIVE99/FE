import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/axios";
import axios from "axios";

import Cookies from "universal-cookie";
const cookies = new Cookies();

//1.
const SET_POST = "SET_POST";
const SET_DETAIL = "SET_DETAIL";
const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";
const EDIT_POST = "EDIT_POST";
const LIKE = "LIKE";

//2.
const setPost = createAction(SET_POST, (post_list, likes) => ({
  post_list,
  likes,
}));
const setPostOne = createAction(SET_DETAIL, (post_one) => ({ post_one }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const deletePost = createAction(DELETE_POST, (post_idx) => ({ post_idx }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const like = createAction(LIKE, (like) => ({ like }));

//3.
const initialState = {
  likes: [],
  like: false,
  target: [],
  list: [],
  is_loading: false,
};

const initialPost = {
  commentsList: [],
  contents: "내용내용",
  createAt: "",
  id: 0,
  imageUrl: "",
  likeCount: 0,
  likesList: [],
  modifiedAt: "",
  user: {
    id: 0,
    username: "username",
    nickname: "nickname",
    password: "",
  },
};

//4.
//게시글 GET
export const getPostDB =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.postGet();

      const newLikes = [];
      //좋아요
      for (let i = 0; i < data.length; i++) {
        newLikes.push(data[i].likesList);
      }

      dispatch(setPost(data, newLikes));
    } catch (e) {
      console.log(e);
    }
  };

//게시글 디테일 GET
export const getPostOneDB =
  (id) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.postOne(id);

      dispatch(setPostOne(data));
    } catch (e) {
      console.log("디테일 가져오기 실패");
    }
  };

//게시글 ADD
const addPostDB = (post) => {
  const token = cookies.get("myJwt");

  const _post = {
    ...initialPost,
    contents: post.contents,
    imageUrl: post.file,
  };

  return async function (dispatch, getState, { history }) {
    const form = new FormData();
    form.append("file", post.file);
    form.append(
      "requestDto",
      new Blob([JSON.stringify({ contents: post.contents })], {
        type: "application/json",
      })
    );

    await axios({
      method: "post",
      url: "http://13.124.136.171/api/posts/write",
      data: form,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        dispatch(addPost(_post));
        history.replace("/postList");
      })
      .catch((err) => {
        console.log(err, "posting 실패");
      });
  };
};

//게시글 UPDATE
const modifyPostDB = (postId = null, post = {}) => {
  const token = cookies.get("myJwt");

  const _post = {
    ...initialPost,
    contents: post.contents,
    imageUrl: post.file,
  };

  return async function (dispatch, getState, { history }) {
    const form = new FormData();
    form.append("file", post.file);
    form.append(
      "requestDto",
      new Blob([JSON.stringify({ contents: post.contents })], {
        type: "application/json",
      })
    );

    await axios({
      method: "put",
      url: `http://13.124.136.171/api/posts/modify/${postId}`,
      data: form,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        console.log(response, "게시글 수정 성공");
        dispatch(editPost(_post));
        history.replace("/postList");
      })
      .catch((err) => {
        console.log(err, "수정 실패");
      });
  };
};

//게시글 DELETE
const deletePostDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    const token = sessionStorage.getItem("token");

    if (!postId) {
      return;
    }

    const _post_list = getState().post.list;

    await axios
      .delete(`http://13.124.136.171/api/posts/delete/${postId}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        const post_idx = _post_list.findIndex((p) => {
          return parseInt(p.postId) === parseInt(postId);
        });

        dispatch(deletePost(post_idx));
        window.location.reload("/postList");
      })
      .catch((err) => {
        console.log("게시글 삭제 실패!!!!", err);
      });
  };
};

//좋아요
const likePostDB = (postId) => {
  return function (dispatch, getState, { history }) {
    apis
      .postLike(postId)
      .then(function (response) {
        dispatch(like(response));
      })
      .catch(function (err) {
        alert("좋아요 실패!!!!");
      });
  };
};

//5.
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
        draft.likes = action.payload.likes;
      }),

    [SET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.target = action.payload.post_one;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),

    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        draft = action.payload.post;
        console.log(action.payload.post);
      }),

    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = state.list.filter((l, idx) => {
          return parseInt(action.payload.post_idx) !== idx;
        });
      }),

    [LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.like = action.payload.like;
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  getPostDB,
  getPostOneDB,
  addPostDB,
  deletePostDB,
  modifyPostDB,
  likePostDB,
  like,
};

export { actionCreators };
