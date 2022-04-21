import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Grid, Text, Button, Input } from "../elements/index";
import { actionCreators as postActions } from "../redux/modules/post";

import { __AddComment } from "../redux/module/__comment";
import {controlComment as commentWrite} from "../redux/module/__comment"

import { history } from "../redux/configureStore";

import CommentsBox from "./Comments";

import Cookies from "universal-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileWink } from "@fortawesome/free-regular-svg-icons";

import icon06 from "../imgs/header/header_09.png";


const DetailCont = (props) => {
  const cookies = new Cookies();

  const post_id = props.id;

  const dispatch = useDispatch();

  const postOne = useSelector((state) => state.post.target);

  React.useEffect(() => {
    dispatch(postActions.getPostOneDB(post_id));
  }, []);


  const [comment, setcomment] = useState("");

  const addComment = () => {
    dispatch(__AddComment(comment, post_id));
    history.replace(`/detail/${post_id}`)
};

  return (
    <Grid width="37%" borderL="1px solid #d9d9d9">
      <Grid flex direction="column">
        {/* 상단 1 */}
        <Grid
          height="69px"
          flex
          className="top"
          items="center"
          borderB="1px solid #d9d9d9"
          padding="0 0 0 15px"
          margin="10px 0"
        >
          <Grid width="12%">
            <Logo src="http://www.goingmary.co.kr/shop/data/images/icons/basic_user.png"></Logo>
          </Grid>
          <Grid flex direction="column" width="80%">
            <Text size="14px" bold>
              {postOne.length !== 0 ? postOne.user.username : ""}

              <Span> • </Span>
              <Span>팔로잉</Span>
            </Text>
          </Grid>
          <Grid width="10%" height="35px" is_center>
            {postOne.length !== 0 &&
            cookies.get("username") === postOne.user.username ? (
              <Button
                text="수정"
                backgroundColor="white"
                broder
                color="#1089FF"
                width="30px"
                _onClick={() => {
                  history.push(`/postModify/${postOne.id}`);
                }}
              ></Button>
            ) : (
              <Text size="10px" bold textAlign="center">
                •••
              </Text>
            )}
          </Grid>
        </Grid>

        {/* 상단 2 (content,댓글) */}
        <ContentBox>
          <Grid flex>
            <Grid width="12%">
              <Logo src={icon06}></Logo>
            </Grid>
            <Grid flex width="75%" items="center">
              <Grid flex width="auto">
                <Text size="14px" bold textAlign="center">
                  {postOne.length !== 0 ? postOne.user.username : ""}
                </Text>
              </Grid>
              <TextBox>
                <Text width="250px" margin="0 5px">
                  {postOne.length !== 0 ? postOne.contents : ""}
                </Text>
              </TextBox>
            </Grid>
          </Grid>
            <Text color="silver" size="13px" height="20px">몇시간 전</Text>
            {/* 댓글 올라오는 창 */}
            <Grid>
              <Grid
                is_flex="true"
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
              {/* <CommentsBox
                postId={post_id}
              >
              </CommentsBox> */}


              </Grid>
            </Grid>
        </ContentBox>

            {/* 댓글 남기기 */}
        <Grid flex margin="100px 0">
          <CommentBox>
            <IconBox>
              <FontAwesomeIcon
                icon={faFaceSmileWink}
                style={{
                  top: "25px",
                  right: "10px",
                  color: "black",
                  height: "25px",
                  fontSize: "100px",
                  marginTop: "30px",
                }}
              />
            </IconBox>

            <Grid flex justify="space-between" width="377px" margin="0">
            <form
            style={formstyle}
            onSubmit={(e) => {
              e.preventDefault();
            }}
            >
              <CommentInput
              // type= "text"
              // width="100%"
              // border="none"
              // background= "none"
              // color= "silver"
              placeholder="댓글달기..."
              onChange={(e) => {
                setcomment(e.target.value);
              }}
              >
              </CommentInput>
              <Button
                text="게시"
                backgroundColor="transparent"
                broder
                color="#cde6fd"
                width="40px"
                _onClick={addComment}
              ></Button>
            </form>
            </Grid>
          </CommentBox>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Logo = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
`;
const Span = styled.span`
  color: #000;
  font-weight: 900;
  font-size: 14px;
`;

const CommentBox = styled.div`
  padding: 0 8px;
  display: flex;
  flex: 1, 1, 0;
  border-top: 1px solid #efefef;
  margin-top: 30px;
`;

const CommentInput = styled.input`
  type: text;
  width: 100%;
  border: none;
  background: none;
  color: black;
  &:focus {
    outline : none;
    border : none;
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
`;

const ContentBox = styled.div`
  padding: 10px 15px;
  height: 500px;
`;

const TextBox = styled.div`
  margin: 0 0 0 15px;
  width: 250px;
`;

const CommentList = styled.div`
  height : 220px;
  overflow : auto;
  margin-top : 50px;
`;

const formstyle = {
  width:"95%",
  display:"flex",
  direction:"row",
  justify:"flex-start",
}

export default DetailCont;
