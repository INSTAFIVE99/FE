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

//2.
const setPost = createAction(SET_POST, (post_list) => ({ post_list }));
const setPostOne = createAction(SET_DETAIL, (post_one) => ({ post_one }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const deletePost = createAction(DELETE_POST, (post_idx) => ({ post_idx }));

//3.
const initialState = {
  like_list: [],
  target: [],
  list: [],
  is_loading: false,
};

const initialPost = {
    commentsList : [],
    contents: "내용내용",
    createAt:"",
    id:0,
    imageUrl: "",
    likeCount: 0,
    likeList : [],
    modifiedAt:"",
    user:{
      id:0,
      username: "username",
      nickname: "nickname",
      password: "",
    }
  //[ {"userid", "comment"},  ...]
};

//4.
//게시글 GET
export const getPostDB =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.postGet();
      dispatch(setPost(data));
      //console.log(data)
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
    //   let resultLiked = data.result.liked;
    //   dispatch(setLike(resultLiked));
    //  console.log(data);
       dispatch(setPostOne(data));
    } catch (e) {
      console.log("디테일 가져오기 실패");
    }
  };

//게시글 ADD
const addPostDB = (post) => {
  //console.log(post); //확인 완
  const token = cookies.get("myJwt");
  //console.log("Authorization", `${token}`);
  // console.log(post.file)
  // console.log(post.contents)

  const _post = {
    ...initialPost,
    contents : post.contents,
    imageUrl : post.file
  }

  return async function (dispatch, getState, { history }) {
    //   console.log(token);

    const form = new FormData();
    form.append("file", post.file);
    form.append(
      "requestDto", ///이름 확인
      new Blob([JSON.stringify({ contents: post.contents })], {
        type: "application/json",
      })
    // form.append("requestDto", post.contents);
    );

    // console.log(form);

    await axios({
      method: "post",
      url: "http://13.124.136.171/api/posts/write",
      data: form,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `${token}` //형식 확인
      },
    })
      .then((response) => {
        //console.log(response, "게시글 ADD 성공");
        dispatch(addPost(_post));
        //console.log(post)
        history.replace("/postList");
      })
      .catch((err) => {
        console.log(err, "posting 실패");
      });


  };
};


//게시글 UPDATE


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
            "Authorization": `${token}`, 
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


//5.
export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),

    [SET_DETAIL]: (state, action) =>
      produce(state, (draft) => {

        draft.target = action.payload.post_one;
        console.log(action.payload);
    }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),


    [DELETE_POST] : (state, action) =>
      produce(state, (draft) => {
        draft.list = state.list.filter((l, idx) => {
          return parseInt(action.payload.post_idx) !== idx;
        });
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
};

export { actionCreators };
