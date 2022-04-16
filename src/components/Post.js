import React, {useState} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileWink } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import { Button, Grid, Image, Text } from "../elements/index";
import { useRef } from "react";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import heart from "../imgs/heart.png";
import noheart from "../imgs/noheart.png";
import comment from "../imgs/comment.png"
import dm from "../imgs/dm.png";

import Modal from "../elements/Modal";


const Post = (props) => {
  const dispatch = useDispatch();

  // 좋아요
  const like_state = useSelector((state) => state.post.like);
  const [like, setLike] = React.useState(like_state); 
  const like_list = useSelector((state) => state.post.likes);

  const [moreInfo, setMoreInfo] = useState(false);

  //모달 - 게시글 삭제
  const deletePost = () => {
    alert("삭제가 완료되었습니다!")
    //dispatch
    setMoreInfo(false);
    history.replace("/postList"); //안되는듯
    // }).then((willDelete) => {
    //   if (willDelete) {
    //     dispatch(deletePostDB(postId));
    //     setMoreInfo(false);
    //     alert("삭제 완료!", "", "success");
    //   } else {
    //     alert("다시생각하세요");
    //   }
    // });
  };


  const plz = async () => {
    // await dispatch(commentActions.getCommentDB(props.post_id));
    //await dispatch(postActions.getPostOneDB(props.id));
    history.push(`/detail/${props.id}`);
  };
  //const localData = localStorage.getItem("MY_LOCAL");

 // const fileType = props.upload[0].mimetype;

  //-- 시간 --
  //const createdAt = props.createdAt;

  //글자수 제한
  const contentRef = useRef(null);

  //더보기
  const moreClick = (e) => {
    contentRef.current.classList.add("show");
    e.currentTarget.classList.add("hide");
  };

  //좋아요
  const toggleLike = () => {
    //dispatch(postActions.likePostDB(props._id));
    setLike(!like);
    //dispatch(postActions.like(like));
  };
  React.useEffect(() => {
    // if (like_list[props.idx] === true) {
    //   setLike(true);
    // }
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
          <Image shape="circle" src="https://i.pinimg.com/originals/14/f5/9b/14f59b8c01290e9d2df0a39fbbc7679a.jpg" />
          <Text bold padding="0 0 0 10px" fontWeight="bold">
            {props.author}
          </Text>
        </Userinfo>

        <More>
          {/* {props.nickname === localData ? (
            <PostModal is_me={true} post_id={props._id} />
          ) : (
            <PostModal is_me={false} post_id={props.id} />
          )} */}
           <FontAwesomeIcon
                  icon={faEllipsisVertical}
                  style={{
                    top: "15px",
                    left: "16px",
                    color: "#333",
                    height: "20px",
                    marginLeft : "10px",
                    color: "black"
                  }}
                  onClick={()=>{setMoreInfo(true)}}
                />
            
            {/* 모달 */}
            <Modal visible={moreInfo} width="400px" borderRadius="10px">
        <ModalArea
            style={{ color: "red", fontWeight: "900" }}
            onClick={deletePost}
            >
            삭제
        </ModalArea>
        <ModalArea style={{ color: "red", fontWeight: "900" }}>신고</ModalArea>
        <ModalArea style={{ color: "red", fontWeight: "900" }}>
            팔로우
        </ModalArea>
        <ModalArea >  
        {/* onClick={() => setCommentModal(true)}  */}
            게시물로 이동
        </ModalArea>
        <ModalArea>공유 대상...</ModalArea>
        <ModalArea>링크 복사</ModalArea>
        <ModalArea>퍼가기</ModalArea>
        <ModalAreaLast  
            onClick={() => setMoreInfo(false)}
        >
        취소
        </ModalAreaLast>
                </Modal>
        </More>
      </UserBox>


      {/* 2번  */}
      <Grid>
          <PostImage
            // src={props.upload[0].path}
            src="https://i.pinimg.com/originals/14/f5/9b/14f59b8c01290e9d2df0a39fbbc7679a.jpg"
          />
      </Grid>

      {/* 3번 */}
      <Grid padding="0 10px" margin="420px 0 0 0" height="30px">
        <Icon
          src={!like ? heart : noheart}
          alt="headerIcon_05"
          like={like}
          onClick={toggleLike}
        />
        <Icon src={comment} alt="icon06" onClick={plz} />
        <Icon src={dm} alt="headerIcon_02" />
      </Grid>

      {/* 4번   */}
      <Grid padding="0 10px" margin="0" height="25px">
        <Text bold> 좋아요 0 개</Text>
        {/* {props.likes} */}
      </Grid>

      {/* 5번 */}
      <Grid padding="0" flex alignItems="center" height="25px">
        {/* <Ellipsis ref={contentRef}> */}
          <Text bold float="left" padding="0 0 0 10px" width="100px">
            {/* {props.nickname} */}
            nickname
          </Text>
          {/* {props.content} */}
          <Text width="100%" margin="0" padding="0">내용내용</Text>
        {/* </Ellipsis> */}

        {/* <EButton onClick={moreClick}>더보기</EButton> */}
       
      </Grid>
      {/* 6번 */}
      <Grid padding="0" height="20px" margin="10px 5px">
        <EButton
          color="#8e8e8e"
          fontWeight="600"
          cursor="pointer"
          onClick={plz}
          border="none"
          background="none"
        >
          {/* {props.comments.length > 0
            ? `댓글 ${props.comments.length}개 모두보기`
            : "댓글입니다"} */}
            댓글 0개 더보기
        </EButton>
      </Grid>
      {/* 7번 */}
      <Grid padding="5px 10px" margin="20px 0 0 0">
        <Text color="#8e8e8e" size="10px">
         몇 시간 전,,,
        </Text>
      </Grid>


      {/* 8번 - 댓글 작성*/}
      <CommentBox>
          <ImageBox>
                <FontAwesomeIcon
                  icon={faFaceSmileWink}
                  style={{
                    top: "15px",
                    left: "16px",
                    color: "#333",
                    height: "20px",
                    marginLeft : "10px",
                    color: "darkgrey"
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
            onClick={plz}
          >댓글 달기..</EButton>
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

//---- 1 ----
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
  algin-items : center;
`;
const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 20px;
  cursor: pointer;
`;

Post.defaultProps = {};
const Ellipsis = styled.div`
  position: relative;
  display: -webkit-box;
  max-height: 6rem;
  line-height: 2rem;
  width: 220px;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  float: left;
  &.show {
    display: block;
    max-height: none;
    width: 93%;
    line-height: 1.8;
    -webkit-line-clamp: unset;
  }
`;
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
width : 100%;
height : 450px;
`

const ImageBox = styled.div`
  display : flex;
  justify-content: center;
  align-items : center;
  width : 20px;
  height : 50px;
`;

const ModalArea = styled.div`
  height: 48px;
  border-bottom: 1px solid lightgrey;
  display: ${(props) => (props.none ? "none" : "flex")};;
  text-align: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
`;

const ModalAreaLast = styled.div`
  height: 48px;
  display: ${(props) => (props.none ? "none" : "flex")};;
  text-align: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
`;
export default Post;