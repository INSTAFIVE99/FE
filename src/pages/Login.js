import React, {useState}  from "react";
import styled from "styled-components";
import { Grid, Button, Input, Text, Image } from "../elements";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";


const Login = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const {userInfo, setUserInfo} = useState({
        islogin: false,
        username: "",
        password: ""
    });

    const onChangeInput = (e) => {
        const { value, name } = e.target;

        setUserInfo({
            ...userInfo,
            [name]: value,
        })
    }


    const [ username, setUserName ] = useState();
    const [ password, setPassword ] = useState();



    const login = () => {
        if (username === "" || password ===""){
            window.alert("아이디 혹은 비밀번호 입력")
            return;
        }
    }
    


    return (
        <Grid
            is_flex="true"
            width="300px"
            height="400px"
            margin="190px auto"
            padding="30px 0 0 0"
            direction="column"
            justify="space-between"
            alignItems="center"
            boxSizing="border-box"
            border="1px solid lightgray"
        >
            <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png?20160616034027"
                width="75%"
            />
            <Grid
                boxSizing="border-box"
                is_flex="true"
                justify="space-around"
                direction="column"
                height="200px"
                // border="5px solid red"
                margin="0 0 20px 0"
                padding="20px 0 20px 0"
            >
                <Grid
                    // border="5px solid red"
                    width="80%"
                >
                <Input
                    radius="3px"
                    height="40px"
                    label=""
                    type="text"
                    placeholder="전화번호, 사용자 이름 또는 이메일"
                    border="1px solid lightgray"
                    name="username"
                    _onChange={(e) => {
                        setUserName(e.targe.value);
                    }}
                ></Input>
                <Input
                    radius="3px"
                    height="40px"
                    label=''
                    type="text"
                    placeholder="비밀번호"
                    border="1px solid lightgray"
                    name="password"
                    _onChange={(e) => {
                        setPassword(e.targe.value);
                    }}
                ></Input>
                </Grid>
                
                    <Button
                    radius="3px"
                    fontSize="8px"
                    width="75%"
                    height="30px"
                    padding=""
                    // { btnColor ? color= "skyblue" : color= "lightblue"}
                    _onClick={login}>로그인</Button>
                </Grid>
            <Grid
            margin="0 0 10px 0"
            boxSizing="border-box"
            // border="5px solid green"
            is_flex="true"
            justify="center"
            alignItems="center"
            padding="0 60px"
            >
                <Text>아이디가 없다면</Text>
                <Button
                radius="3px"
                fontSize="8px"
                width="40%"
                height="30px"
                margin="10 0"
                padding=""
                _onClick={() => history.push("/signUp")}
                >가입하기</Button>
            </Grid>
        </Grid>
    
    )

}

export default Login;