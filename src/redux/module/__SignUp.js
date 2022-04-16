import axios from "axios";

const SIGNUP = "signUp/SIGNUP";



const initialState = {
  userid: "",
  nickname: "",
  password: "",
  validPassword: ""
};



function signUp(payload) {
    return { type: SIGNUP, payload: payload}
  };

export const __SignUp =
  (signup) =>
  async (dispatch, getState, { history }) => {
    //네트워크 요청
    axios.post("", signup)
      .then(() => {
        window.alert("회원가입 완료");
        history.replace("/");
      })
      .catch((err) => {
        window.alert(err);
      });
  };

const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGNUP:
        return {
          ...state,
          userid: this.state.userid,
          nickname: this.state.nickname,
          password: this.state.password,
          validPassword: this.state.validPassword
        };
          default:
          return state;
    };
  };

  export default signUpReducer;