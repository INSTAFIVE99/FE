import axios from "axios";

const SIGNUP = "signUp/SIGNUP";


// const UNCHECK = "unCheck/UNCHECK";
// const NNCHECK = "nnCheck/NNCheck";



const initialState = {
  username: "",
  nickname: "",
  password: "",
  validPassword: ""
};



// function signUp(payload) {
//   return { type: SIGNUP, payload: payload}
// };

// const unCheck = (payload) => {
//   return { type:UNCHECK, payload: payload}
// };

// const nnCheck = (payload) => {
//   return { type:NNCHECK, payload: payload}
// };


// {error code: 600-아이디 중복}, 601-닉네임 중복, 603-회원정보 없음, 604-토큰없음


export const __SignUp =
  (signUp) =>
  async (dispatch, getState, { history }) => {
   console.log(signUp)
    await axios.post("http://13.124.136.171/api/user/signup", signUp)
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
          username: this.state.username,
          nickname: this.state.nickname,
          password: this.state.password,
        };
          default:
          return state;
    };
  };

  export default signUpReducer;