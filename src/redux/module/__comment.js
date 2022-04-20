import axios from "axios";

const comment = new Comment();

const ADDCOMMENT = "addComment/ADDCOMMENT"
const DELCOMMENT = "delComment/DELCOMMENT"


const initialState = {
    comment: "",
}

const AddComment = (payload) => {
    return { type:ADDCOMMENT, payload: payload}
}

const DelComment = (payload) => {
    return { type:DELCOMMENT, payload: payload}
}

export const __AddComment =
  (addcomment) =>
  async (dispatch, getState, { history }) => {
   console.log(addcomment)
    await axios.post("http://13.124.136.171/api/api/comments/{postId}", addcomment)
      .then(() => {
        window.alert("댓글이 등록되었습니다.");
        history.replace("/detail/:id");
      })
      .catch((err) => {
        window.alert(err);
      });
  };

export const __DelComment =
  (addcomment) =>
  async (dispatch, getState, { history }) => {
   console.log(addcomment)
    await axios.post("http://13.124.136.171/api/api/comments/{commentId}", addcomment)
  };

//   reducer
const commentReducer = (currentState, action) => {
    if(currentState === undefined) {
        return(
            comment: 
        );
    }
    const newState = { ...currentState };
    return newState;
}

