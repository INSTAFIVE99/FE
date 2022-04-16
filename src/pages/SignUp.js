import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isStrongPassword, isLength, isAlphanumeric } from 'validator';

import { __SignUp } from "../redux/module/__SignUp";
import { Grid, Button, Input, Text, Image} from "../elements"


const SignUp = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
      username: "",
      nickname: "",
      password: "",
      validPassword: "",
    })
  
    const [username, setusername] = useState('');
    const [nickname, setnickname] = useState('');
    const [password, setpassword] = useState('');
    const [validPassword, setvalidPassword] = useState('');
  
  
    const signUp = () => {
       
      if (!isAlphanumeric(username) || !isLength(username, { min:4, max:12 })){
        window.alert("아이디는 4~12자의 영문 대소문자와 숫자를 입력해주세요.")
      }

      if (!isAlphanumeric(nickname) || !isLength(nickname, { min:4, max:12 })){
        window.alert("닉네임은 4~12자의 영문 대소문자와 숫자를 입력해주세요.")
      }
      
      if (!isStrongPassword(password) || !isLength(password, { min:8, max:16 })){
        window.alert("비밀번호는 8~16자의 영문 대소문자, 숫자 그리고 기호를 포함합니다.")
      }
           
      if (password !== validPassword) {
        window.alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
      };
      
      if (username === "" || nickname === "" || password === "" || validPassword === "") {
        window.alert("빈칸을 채워주세요.");
        return;
      };

      dispatch(__SignUp({
        username: username,
        nickname: nickname,
        password: password,
        validPassword: validPassword
    }))

    const unCheck= (username) => {
      
    }

    const nnCheck= (nickname) => {

    }

  
    };
    return(
      <Grid>
        <Grid
          is_flex="true"
          width="300px"
          height="550px"
          margin="190px auto 0px"
          padding="30px 0 0 0"
          direction="column"
          justify="space-between"
          alignItems="center"
          boxSizing="border-box"
          border="1px solid lightgray"
        >
            <Grid
              height="250px"
              padding="none"
              is_flex="true"
              direction="column"
              justify="space-between"
              alignItems="center"
              boxSizing="border-box"
            >
              <Image
                  shape="rectangle"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png?20160616034027"
                  width="75%"
              />
              <Text
                textAlign= "center"
              >친구들의 사진과 동영상을 보려면<br/>가입하세요.</Text>
              <Button
                radius="4px"
                width= "80%"
                height= "30px"
                padding= "none"
              >FaceBook으로 로그인</Button>
            </Grid>
            <Grid
              width="80%"
              is_flex="true"
              direction="row"
              justify="space-between"
              alignItems="center"
              boxSizing="border-box"
            >
              <Grid
                padding= "none"
                width= "40%"
                height="0.1px"
                border="0.1px solid lightgray"
              />
                <Text>또는</Text>
                <Grid
                padding= "none"
                width= "40%"
                height="0.1px"
                border="0.1px solid lightgray"
              />
              </Grid>
            <Grid
              padding="10px 0"
              is_flex="true"
              direction="column"
              justify="space-between"
              alignItems="center"
              height="380px"
              width="80%">
            <form 
            style={formStyle} 
            onSubmit={(e) => {
              e.preventDefault();
            }}>
            <Input
                    radius="3px"
                    height="35px"
                    label=""
                    type="text"
                    placeholder=" Your Id (4~12, Aa, 123..)"
                    border="1px solid lightgray"
                    name="username"
                    // onblur={unCheck}
                    _onChange={(e) => {
                        setusername(e.target.value);
                    }}
                />
            <Input
                    radius="3px"
                    height="35px"
                    label=""
                    type="text"
                    placeholder=" Nickname (4~12, Aa, 123..)"
                    border="1px solid lightgray"
                    name="nickname"
                    // onblur={nnCheck}
                    _onChange={(e) => {
                        setnickname(e.target.value);
                    }}
                />
            <Input
                    radius="3px"
                    height="35px"
                    label=""
                    type="password"
                    placeholder=" Password (8~16, Aa , !@#.., 123..)"
                    border="1px solid lightgray"
                    name="password"
                    _onChange={(e) => {
                        setpassword(e.target.value);
                    }}
                />
            <Input
                    radius="3px"
                    height="35px"
                    label=""
                    type="password"
                    placeholder=" Password Again"
                    border="1px solid lightgray"
                    name="validPassword"
                    _onChange={(e) => {
                        setvalidPassword(e.target.value);
                    }}
                />
                <Button
                radius="3px"
                fontSize="12px"
                width="100%"
                height="30px"
                margin="13px 0"
                padding=""
                _onClick={signUp}
              >가입하기</Button>
              </form>
            </Grid>
        </Grid>
        <Grid
         margin="10px auto"
         width="300px"
         height="50px"
         border="1px solid lightgray"
         is_flex="true"
         direction="row"
         justify="center"
         alignItems="center"
        >
          <Grid
            margin="0 auto"
            width="60%"
            height="50px"
            is_flex="true"
            direction="row"
            justify="center"
            alignItems="center"

          >
            <Text
              size="12px"
            >계정이 있으신가요?</Text>
            <Button
              radius="3px"
              fontSize="12px"
              width="30%"
              height="30px"
              margin="10 0"
              padding=""
              backgroundColor="white"
              color="skyblue"
              _onClick={() => history.push("/")}
            >
              로그인
            </Button>
          </Grid>
        </Grid>
    </Grid>
    )
}

    export default SignUp;



const formStyle = {
  width: "100%"
}