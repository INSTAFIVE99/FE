import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Grid, Text, Input, Button } from "../elements/index";
import { actionCreators as postActions } from "../redux/modules/post";
import { __AddComment } from "../redux/module/__comment";
// import { commentActions } from "../redux/modules/comment";
import { history } from "../redux/configureStore";

import Cookies from "universal-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmileWink } from "@fortawesome/free-regular-svg-icons";

import icon01 from "../imgs/header/header_01.png";
import icon02 from "../imgs/header/header_02.png";
import icon03 from "../imgs/header/header_03.png";
import icon04 from "../imgs/header/header_04.png";
import icon05 from "../imgs/header/header_05.png";
import icon06 from "../imgs/header/header_09.png";
import logo from "../imgs/header/header_logo.png";
import heart from "../imgs/heart.png";
import noheart from "../imgs/noheart.png";
import comment from "../imgs/comment.png";
import dm from "../imgs/dm.png";

// import { returnGapDate } from "../shared/date";

const DetailCont = (props) => {

  const cookies = new Cookies();

  const post_id = props.id;

  const dispatch = useDispatch();

  const postOne = useSelector((state) => state.post.target);

// console.log(props);
  //   const comment = React.useRef();
  //   const like_state = useSelector((state) => state.post.like);
  //const [like, setLike] = React.useState(like_state); // 좋아요
  //   const like_list = useSelector((state) => state.post.likes);

  const toggleLike = () => {
    // dispatch(postActions.likePostDB(post_id));
    //setLike(!like);
    // dispatch(postActions.like(like));
  };

  React.useEffect(() => {
    // if (like_list[post_id] === true) {
    //   setLike(true);
    // }
    dispatch(postActions.getPostOneDB(post_id));
  }, []);

  // 게시글 상세 조회
  // React.useEffect(() => {}, []);

  // const posts_info = useSelector((state) => {
  //   return state.post.target;
  // });
  //   const comment_info = useSelector((state) => {
  //     return state.post.post.result.comments;
  //   });

  // 시간
  //   const createdAt = posts_info.result.createdAt;
  //   const date = returnGapDate(new Date(), createdAt);

  // 댓글 게시 추가 기능
  //   const addComment = () => {
  //     dispatch(commentActions.addCommentDB(post_id, comment.current.value));
  //   };

  // delete 버튼 만들어서 onclick
  //   const DeletePost = () => {
  //     dispatch(postActions.deletePostDB(post_id));
  //   };

  //   const deleteComment = (e) => {
  //     const comment_id = e.target.comment_id;
  //     dispatch(postActions.deleteCommentDB(post_id, comment_id));
  //   };

const ControlComments = () => {

  const [comments, setcomments] = useState({
    nickname: "", comment: ""
  });
  const [comment, setcomment] = useState("");

}

const addComment = () => {

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
            <Text size="14px" bold >
               {postOne.length !== 0 ? postOne.user.username : ""}

              
              <Span> • </Span>
              <Span>팔로잉</Span>
            </Text>
            {/* <Text margin="5px 0 0 0">장소</Text> */}
          </Grid>
          <Grid width="10%" height="35px" is_center>
            {
                postOne.length !== 0 && cookies.get("username") === postOne.user.username
                ?    <Button
                        text="수정"
                        backgroundColor="white"
                        broder
                        color="#1089FF"
                        width="30px"
                       _onClick={()=>{history.push(`/modifyFileUpload/${postOne.id}`)}}
                    ></Button>

                :  <Text size="10px" bold textAlign="center">
                •••
              </Text>
            }
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
                  {/* {posts_info.result.nickname} */}
                  {postOne.length !== 0 ? postOne.user.username : ""}
                </Text>
              </Grid>
              <TextBox>
              <Text width="250px" margin="0 5px">
                {/* {posts_info.result.content} */}
                {postOne.length !== 0 ? postOne.contents : ""}
              </Text>
              </TextBox>
            </Grid>
          </Grid>
            <Text color="silver" size="13px" height="20px">몇시간 전</Text>

            {/* 댓글 올라오는 창 */}
            <CommentList>
              <Grid
                is_flex="true"
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <Text
                margin="0 8px 0 0"
                bold="600"
                >username</Text>
                <Text>commentasdlk;</Text>
              </Grid>
            </CommentList>
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
                marginTop: "30px"
              }}
            />
            </IconBox>

            <Grid flex justify="space-between" width="377px" margin="0">
              {/* <Input
                type="text"
                width="100%"
                border="none"
                background="none"
                placeholder="댓글달기..."
                color="#8e8e8e"
                // ref={comment}
              /> */}
              <CommentInput
                placeholder="댓글달기...">
              </CommentInput>
              <Button
                text="게시"
                backgroundColor="transparent"
                broder
                color="#cde6fd"
                width="40px"
                _onClick={addComment}
              ></Button>
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
const Icon = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 20px;
`;

const IconComment = styled.img`
  width: 21px;
  height: 21px;
  margin-right: 20px;
`;
const CommentBox = styled.div`
  padding: 0 8px;
  display: flex;
  flex: 1, 1, 0;
  border-top: 1px solid #efefef;
  margin-top : 30px;
`;

const CommentInput = styled.input`
  type : text;
  width : 100%;
  border : none;
  background : none;
  color : silver;

  &:focus {
    outline : none;
    border : none;
    color : blue;
  }
`

const IconBox = styled.div`
  display : flex;
  align-items : center;
  margin-right : 5px;
`;

const ContentBox = styled.div`
  padding: 10px 15px;
  height : 500px;

`;

const TextBox = styled.div`
  margin : 0 0 0 15px;
  width : 250px;

`;

const CommentList = styled.div`
  height : 220px;
  overflow : auto;
  margin-top : 50px;
`;
export default DetailCont;
