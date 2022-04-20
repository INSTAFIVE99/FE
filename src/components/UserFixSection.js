import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Button, Grid, Image, Text } from "../elements/index";

import Cookies from "universal-cookie";

const UserFixSection = (props) => {
  const cookies = new Cookies();

  const [name, setName] = useState([
    "최서라",
    "최진용",
    "김태현",
    "권윤주",
    "권규민",
  ]);

  return (
    <React.Fragment>
      <UserBox width="100%">
        <Userinfo>
          <Image shape="circle" src={props.src} size="50" />
          <Grid flex justify="space-between">
            <TextBox>
              <Text bold>{cookies.get("username")}</Text>
            </TextBox>
            <SideButton>로그아웃</SideButton>
          </Grid>
        </Userinfo>
        <Grid flex justify="space-between" height="40px" margin="10px 0 0 0">
          <Text color="#8e8e8e" size="14px" bold>
            회원님을 위한 추천
          </Text>
          <Text size="12px" color="black" bold>
            모두 보기
          </Text>
        </Grid>

        {name.map((n, idx) => {
          return (
            <Userinfo key={idx}>
              <Image shape="circle" src={props.src} />
              <Grid flex justify="space-between">
                <TextBox>
                  <Text bold fontWeight="bold" textAlign="center">
                    {n}
                  </Text>
                </TextBox>
                <SideButton>팔로우</SideButton>
              </Grid>
            </Userinfo>
          );
        })}
      </UserBox>
      <Footer>
        <ul>
          <li>소개</li>
          <li>도움말</li>
          <li>홍보 센터</li>
          <li>API</li>

          <li>개인정보처리방침</li>
          <li>약관</li>
          <li>위치</li>
          <li>인기 계정</li>
          <li>해시태그</li>
        </ul>
        <p>© 2022 CLONE FIVE</p>
      </Footer>
    </React.Fragment>
  );
};
const UserBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  flex-direction: column;
`;
const Userinfo = styled.div`
  width: 100%;
  padding: 5px 0;
  display: flex;
  align-items: center;
`;

const Footer = styled.div`
  & ul {
    padding: 20px 16px 10px 0px;
    display: inline-block;
    list-style: none;
  }
  & li {
    float: left;
    font-size: 11px;
    padding: 0 2px;
    color: #b2b1b9;
    ::after {
      content: " ·";
    }
  }
  & p {
    display: inline-block;
    font-size: 11px;
    color: #b2b1b9;
    padding: 0 16px;
  }
`;

const SideButton = styled.button`
  all: unset;
  font-size: 12px;
  color: #1089ff;
  font-weight: 700;
`;

const TextBox = styled.div`
  margin-left: 10px;
`;
export default UserFixSection;
