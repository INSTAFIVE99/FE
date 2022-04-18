import React from "react";
import styled from "styled-components";
import { Grid, Text, Input, Button } from "../elements/index";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmileWink } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { history } from "../redux/configureStore";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
// import { commentActions } from "../redux/module/comment";

import PostDetailImage from "../components/PostDetailImage";
import PostDetailContent from "../components/PostDetailContent"


const Detail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const post_id = params.post_id;

  //body 스크롤 멈추기
  React.useEffect(() => {
    //dispatch(commentActions.getCommentDB(post_id));
    //dispatch(postActions.getPostOneDB(post_id));
    document.body.classList.add("overflowHidden");
    window.scrollTo(0, 0);
    return () => {
      document.body.classList.remove("overflowHidden");
    };
  }, []);

  const posts_info = useSelector((state) => {
    return state.post.target;
  });

  const preview = useSelector((state) => state.image.preview);


  return (
    <Grid
      width="100%"
      height="100vh"
      margin="0 auto"
      background="rgba(0, 0, 0, 0.8)"
      position="absolute"
      top="0"
      left="0"
      zIndex="11"
      is_center
    >
      <Grid
        className={"modalcont"}
        width="1060px"
        height="650px"
        margin="100px auto 0 auto"
        background="#fff"
        radius="10px"
        flex
      >
        <FontAwesomeIcon
        icon={faXmark}
          style={{
            position: "absolute",
            top: "30px",
            right: "10px",
            color: "#fff",
            height: "30px",
            fontSize: "100px",
          }}
          onClick={() => {
            history.push(`/postList`);
          }}
        />


        <PostDetailImage />
        <PostDetailContent></PostDetailContent>
      </Grid>
    </Grid>
  );
};

export default Detail;