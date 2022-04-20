import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileWink } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import { Button, Grid, Image, Text } from "../elements/index";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import heart from "../imgs/heart.png";
import noheart from "../imgs/noheart.png";
import comment from "../imgs/comment.png";
import dm from "../imgs/dm.png";
import profile from "../imgs/header/header_09.png";

import Modal from "../elements/Modal";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Post = (props) => {
  const dispatch = useDispatch();

  // 좋아요
  const like_state = useSelector((state) => state.post.like);
  const like_list = useSelector((state) => state.post.likes);

  const [like, setLike] = React.useState(like_state);

  const [likeCnt, setLikeCnt] = React.useState(props.likesList.length);

  //more 모달
  const [moreInfo, setMoreInfo] = useState(false);

  //모달 - 게시글 삭제
  const deletePost = () => {
    alert("삭제가 완료되었습니다!");
    dispatch(postActions.deletePostDB(props.id));
    setMoreInfo(false);
  };

  //해당 게시글 디테일로 이동
  const postOne = () => {
    dispatch(postActions.getPostOneDB(props.id));
    history.push(`/detail/${props.id}`);
  };

  //좋아요
  const toggleLike = () => {
    dispatch(postActions.likePostDB(props.id));
    setLike(!like);

    if (like === true) {
      setLikeCnt(likeCnt - 1);
    } else {
      setLikeCnt(likeCnt + 1);
    }

    dispatch(postActions.like(like));
  };

  React.useEffect(() => {
    for (let i = 0; i < props.likesList.length; i++) {
      props.likesList[i].user.username === cookies.get("username")
        ? setLike(true)
        : setLike(false);
    }
  }, []);

  return (
    <Grid
      border="1px solid #dedede"
      radius="3px"
      margin="25px 0"
      background="#fff"
      height="800px"
    >
      {/* 1번 */}
      <UserBox width="100%">
        <Userinfo>
          <Image shape="circle" src={profile} />
          <Text bold padding="0 0 0 10px">
            {props.user.username}
          </Text>
        </Userinfo>

        <More>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            style={{
              top: "15px",
              left: "16px",
              color: "#333",
              height: "20px",
              marginLeft: "10px",
              color: "black",
            }}
            onClick={() => {
              setMoreInfo(true);
            }}
          />

          {/* 모달 */}
          <Modal visible={moreInfo} width="400px" borderRadius="10px">
            {props.user.username === cookies.get("username") ? (
              <ModalArea
                style={{ color: "red", fontWeight: "900" }}
                onClick={deletePost}
              >
                삭제
              </ModalArea>
            ) : null}

            <ModalArea style={{ color: "red", fontWeight: "900" }}>
              신고
            </ModalArea>
            <ModalArea style={{ color: "red", fontWeight: "900" }}>
              팔로우
            </ModalArea>
            <ModalArea>게시물로 이동</ModalArea>
            <ModalArea>공유 대상...</ModalArea>
            <ModalArea>링크 복사</ModalArea>
            <ModalArea>퍼가기</ModalArea>
            <ModalAreaLast onClick={() => setMoreInfo(false)}>
              취소
            </ModalAreaLast>
          </Modal>
        </More>
      </UserBox>

      {/* 2번  */}
      <Grid>
        <PostImage src={props.imgUrl} />
      </Grid>

      {/* 3번 */}
      <Grid padding="0 10px" margin="420px 0 0 0" height="30px">
        <Icon
          src={!like ? noheart : heart}
          alt="headerIcon_05"
          like={like}
          onClick={toggleLike}
        />
        <Icon src={comment} alt="icon06" onClick={postOne} />
        <Icon src={dm} alt="headerIcon_02" />
      </Grid>

      {/* 4번   */}
      <Grid padding="0 10px" margin="0" height="25px">
        <Text bold>좋아요 {likeCnt} 개</Text>
      </Grid>

      {/* 5번 */}
      <Grid padding="0" flex alignItems="center" height="25px">
        <Text bold float="left" padding="0 0 0 10px" width="100px">
          {props.user.username}
        </Text>
        <Text width="100%" margin="0" padding="0">
          {props.contents}
        </Text>
      </Grid>

      {/* 6번 */}
      <Grid padding="0" height="20px" margin="10px 5px">
        <EButton
          color="#8e8e8e"
          fontWeight="600"
          cursor="pointer"
          onClick={postOne}
          border="none"
          background="none"
        >
          {props.comments && props.comments.length > 0
            ? `댓글 ${props.commentsList.length}개 모두보기`
            : "댓글 0개 모두보기"}
        </EButton>
      </Grid>

      {/* 7번 */}
      <Grid padding="5px 10px" margin="20px 0 0 0">
        <Text color="#8e8e8e" size="10px">
          몇 분 전...
        </Text>
      </Grid>

      <CommentBox>
        <ImageBox>
          <FontAwesomeIcon
            icon={faFaceSmileWink}
            style={{
              top: "15px",
              left: "16px",
              color: "#333",
              height: "20px",
              marginLeft: "10px",
              color: "darkgrey",
            }}
          />
        </ImageBox>

        <Grid flex justify="space-between" margin="0 10px" alignItems="center">
          <EButton
            type="text"
            width="20%"
            size="24"
            border="none"
            background="none"
            text="댓글달기..."
            color="#8e8e8e"
            onClick={postOne}
          >
            댓글 달기..
          </EButton>
          <EButton
            text="게시"
            bg="none"
            border="none"
            color="#cde6fd"
          ></EButton>
        </Grid>
      </CommentBox>
    </Grid>
  );
};

const UserBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
`;
const Userinfo = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;
`;
const More = styled.div`
  padding-right: 16px;
`;
const CommentBox = styled.div`
  padding: 0 10px;
  display: flex;
  flex: 1, 1, 0;
  border-top: 1px solid #efefef;
  algin-items: center;
`;
const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 20px;
  cursor: pointer;
`;

Post.defaultProps = {};

const EButton = styled.button`
  max-height: 2rem;

  background: none;
  border: none;
  color: #8f8f8f;
  font-size: 14px;
  cursor: pointer;
  &.hide {
    display: none;
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 450px;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 50px;
`;

const ModalArea = styled.div`
  height: 48px;
  border-bottom: 1px solid lightgrey;
  display: ${(props) => (props.none ? "none" : "flex")};
  text-align: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
`;

const ModalAreaLast = styled.div`
  height: 48px;
  display: ${(props) => (props.none ? "none" : "flex")};
  text-align: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
`;
export default Post;
