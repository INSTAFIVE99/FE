import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/axios";
import axios from "axios";

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
    username: "username",
    content: "내용내용",
    liked: 0,
    imageUrl: "",
    comment: [],  //체크 필요
};

//4.
//게시글 GET
export const getPostDB =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await apis.postGet();
      dispatch(setPost(data));
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
       dispatch(setPostOne(data.result));
    } catch (e) {
      console.log("디테일 가져오기 실패");
    }
  };

//게시글 ADD
const addPostDB = (post) => {
  console.log(post); //확인 완
  const token = sessionStorage.getItem("token"); //토큰 가져오기

  return async function (dispatch, getState, { history }) {
    //   console.log(token);

    const form = new FormData();
    form.append("file", post.file);
    form.append(
      "requestDto", ///이름 확인
      new Blob([JSON.stringify({ contents: post.contents })], {
        //dictionary 타입, contents : ? 확인
        type: "application/json",
      })
    );

    console.log("form은 ", form); //이게 맞나..? 확인 완

    
    await axios({
      method: "post",
      url: "~/api/posts/write",  //배포 url까지 추가해야함!
      data: form,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${token}`, //형식 확인
      },
    })
      .then((response) => {
        console.log(response, "게시글 ADD 성공");
        dispatch(addPost(post));
        history.replace("/postList");
      })
      .catch((err) => {
        console.log(err, "게시글 ADD 실패!!!");
      });
  };
};


//게시글 UPDATE


//게시글 DELETE
const deletePostDB = (postId, todoNum) => {
    return async function (dispatch, getState, { history }) {
      const token = sessionStorage.getItem("token");

      if (!postId) {
        return;
      }

    const _post_list = getState().post.list;
  
     await axios
        .delete(`/api/posts/delete/${postId}`, {
          headers: { 
            "Authorization": `${token}`, 
          },
        })
        .then((res) => {
          const post_idx = _post_list.findIndex((p) => {
            return parseInt(p.postId) === parseInt(postId);
          });
  
          dispatch(deletePost(post_idx));
          history.replace("/");
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
