import axios from "axios";

const SIGNUP = "signUp/SIGNUP";
const UNCHECK = "unCheck/UNCHECK";
const NNCheck = "nnCheck/NNCheck";



const initialState = {
  username: "",
  nickname: "",
  password: "",
  validPassword: ""
};


// const unCheck = (username) => {
//   return { type: }
// };
// const nnCheck = () => {};

function signUp(payload) {
    return { type: SIGNUP, payload: payload}
  };


export const __SignUp =
  (signUp) =>
 async (dispatch, getState, { history }) => {
   console.log(signUp)
    axios.post("http://13.124.136.171/api/user/signup", signUp)
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