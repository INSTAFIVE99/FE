import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Grid, Text, Input, Button } from "../elements/index";
import { actionCreators as postActions } from "../redux/modules/post";
// import { commentActions } from "../redux/modules/comment";
// import icon02 from "../images/icons/icon_02.png";
// import icon05 from "../images/icons/icon_05.png";
// import icon06 from "../images/icons/icon_06.png";
// import icon07 from "../images/icons/icon_07.png";
// import icon08 from "../images/icons/icon_08.png";
// import icon09 from "../images/icons/icon_09.png";
 import heart from "../imgs/heart.png";
// import { returnGapDate } from "../shared/date";

const DetailCont = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const post_id = params.post_id;
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
  }, []);


  // 게시글 상세 조회 
  React.useEffect(() => {
  }, []);

  const posts_info = useSelector((state) => {
    return state.post.target;
  });
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

  return (
    <Grid width="40%" borderL="1px solid #d9d9d9">
      <Grid flex direction="column">
        <Grid
          height="69px"
          flex
          className="top"
          items="center"
          borderB="1px solid #d9d9d9"
          padding="0 15px"
        >
          <Grid width="15%">
            <Logo src="http://www.goingmary.co.kr/shop/data/images/icons/basic_user.png"></Logo>
          </Grid>
          <Grid flex direction="column" width="75%">
            <Text size="14px" weight="900">
              {/* {posts_info.result.nickname} */}
              nickname
              <Span> • </Span>
              <Span>팔로잉</Span>
            </Text>
            {/* <Text margin="5px 0 0 0">장소</Text> */}
          </Grid>
          <Grid width="10%">
            <Text size="10px" weight="900">
              •••
            </Text>
          </Grid>
        </Grid>
        <Grid
          padding="30px 15px"
          height="560px"
          borderB="1px solid #d9d9d9"
          overflow
        >
          <Grid flex>
            <Grid width="15%">
              <Logo src={heart}></Logo>
            </Grid>
            <Grid flex width="75%" items="center">
              <Grid flex width="auto">
                <Text size="14px" weight="900">
                  {/* {posts_info.result.nickname} */}
                  nickname
                </Text>
              </Grid>
              <Text margin="0 0 0 5px" width="auto%">
                {/* {posts_info.result.content} */}
                내용내용컨텐트컨텐트
              </Text>
            </Grid>
          </Grid>
          <Grid width="100%" margin="0 0 0 59px">
            {/* <Text>{`${date}전`}</Text> */}
            <Text>몇시간 전</Text>
          </Grid>
          {/* {comment_info.map((l, idx) => {
            const createdAt = comment_info[idx].createdAt;
            const today = returnGapDate(new Date(), createdAt);
            return (
              <div key={idx}>
                <Grid flex>
                  <Grid width="15%">
                    <Logo src={icon09}></Logo>
                  </Grid>
                  <Grid flex width="75%" items="center">
                    <Grid flex width="auto">
                      <Text size="14px" weight="900">
                        {comment_info[idx].nickname}
                      </Text>
                    </Grid>
                    <Text margin="0 0 0 5px" width="auto%">
                      {comment_info[idx].comment}
                    </Text>
                  </Grid>
                </Grid>
                <Grid width="100%" margin="0 0 0 59px">
                  <Text>{`${today}전`}</Text>
                </Grid>
              </div>
            );
          })} */}
        </Grid>
        <Grid>
          <Grid padding="10px 16px">
            {/* <img src={icon01} alt="headerIcon_01" /> */}
            {/* {!like ? (
              <Icon src={icon08} alt="headerIcon_08" onClick={toggleLike} />
            ) : (
              <Icon src={icon05} alt="headerIcon_05" onClick={toggleLike} />
            )} */}
            <Icon src={heart} alt="icon06" />
            <Icon src={heart} alt="headerIcon_02" />
          </Grid>
          <Grid padding="10px 16px">
            {/* <Text weight="900">좋아요 {posts_info.result.likes}개</Text> */}
            <Text weight="900">좋아요 0개</Text>
          </Grid>
          <Grid padding="3px 16px">
            {/* <Text size="10px">{`${date}전`}</Text> */}
            <Text>몇시간 전</Text>
          </Grid>
        </Grid>
        <Grid>
          <CommentBox>
            <img
              src={heart}
              alt="이모지"
              style={{ padding: "8px 16px 8px 0" }}
            />
            <Grid flex justify="space-between">
              <Input
                type="text"
                width="80%"
                size="24"
                border="none"
                background="none"
                placeholder="댓글달기..."
                color="#8e8e8e"
                // ref={comment}
              />
              <Button
                text="게시"
                background="none"
                border="none"
                color="#cde6fd"
                // _onClick={addComment}
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
  width: 24px;
  height: 24px;
  margin-right: 20px;
`;
const CommentBox = styled.div`
  padding: 0 8px;
  display: flex;
  flex: 1, 1, 0;
  border-top: 1px solid #efefef;
`;
export default DetailCont;