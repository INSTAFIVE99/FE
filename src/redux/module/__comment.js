import axios from "axios";
import Cookies from "universal-cookie";
import { apis } from "../../shared/axios";

// const cookies = new Cookies();

const ADDCOMMENT = "ADDCOMMENT"
const DELCOMMENT = "DELCOMMENT"
const UPLOADCOMMENT = "UPLOADCOMMENT"
const UPDATECOMMENT = "UPDATECOMMENT";


const initialState = {
    comment: "",
    post_id: "",
}

const AddComment = (payload) => {
    return { type:ADDCOMMENT, payload: payload}
    console.log("a1234", payload)
}

const UPLOADcomment = (payload) => {
    return { type:UPLOADCOMMENT, payload: payload}
}

const DelComment = (payload) => {
    return { type:DELCOMMENT, payload: payload}
}


export const __AddComment = (contents, postId) => {
  return function (dispatch, getState, { history }) {
    apis
      .addComment(postId, contents)
      .then(() => {
        window.alert("댓글이 등록되었습니다.");
        history.replace(`/detail/${postId}`);
      })
      .catch((err) => {
        window.alert(err);
      });
  };
};

export const __DELComment = (postId) => {
  return function (dispatch, getState, { history }) {
    apis
      .addComment(postId)
      .then((res) => {
        window.alert("댓글이 삭제되었습니다.");
        history.replace(`/detail/${postId}`);
      })
      .catch((err) => {
        window.alert(err);
      });
  };
};






//   reducer
export const ControlComment = (currentState, action) => {
  switch(action.type){
    case ADDCOMMENT:
        return{
          ...currentState,
          postId: currentState.postId,
          contents: currentState.contents
        }
      case DELCOMMENT:
        return{
          ...currentState,
          postId: currentState.postId
        }
    default: return currentState;
  }
}

export default ControlComment;