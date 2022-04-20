import React, {useState}  from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import UserFixSection from "../components/UserFixSection";
import { actionCreators as postActions } from "../redux/modules/post";

import { history } from "../redux/configureStore";
import Post from "../components/Post";

import Cookies from "universal-cookie";
import Header from "../components/Header";
const cookies = new Cookies();


const PostList = () => {

    if(!cookies.get("myJwt")){
      history.replace("/")
    }
    
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    console.log(post_list);

    React.useEffect(() => {
    
      dispatch(postActions.getPostDB());
    
  }, []);


    return (
      <>
      <Header></Header>
      <MainBox>
        <Section>
          <PostBox>
          {post_list.map((p, idx) => {
            return <Post key={idx} {...p} />;
          })}

          </PostBox>
          <AsideBox>
            <UserFixSection />
          </AsideBox>
        </Section>
      </MainBox>
      </>
    );

}

export default PostList;

const MainBox = styled.div`
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  height : 100vh;
`;

const Section = styled.div`
  width: 940px;
  height: 100%;
  display: flex;
  min-width: 700px;
  
`;
const PostBox = styled.div`
  width: 600px;

  margin-right: 28px;
  margin-top : 70px;
`;

const AsideBox = styled.div`
  width: 200px;
  position: fixed;
  left: calc(100vw - 37vw);
  top: 110px;
`;
