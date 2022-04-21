import React from "react";
import { Grid } from "../elements/index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { history } from "../redux/configureStore";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import PostDetailImage from "../components/PostDetailImage";
import PostDetailContent from "../components/PostDetailContent";

const Detail = (props) => {
  const dispatch = useDispatch();

  const post_id = props.match.params.id;

  const postOne = useSelector((state) => state.post.target);

  React.useEffect(() => {
    dispatch(postActions.getPostOneDB(post_id));

    document.body.classList.add("overflowHidden");
    window.scrollTo(0, 0);
    return () => {
      document.body.classList.remove("overflowHidden");
    };
  }, []);

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

        <PostDetailImage imgUrl={postOne.imgUrl} />
        <PostDetailContent
          id={post_id}
          likesList={postOne.likesList}
        ></PostDetailContent>
      </Grid>
    </Grid>
  );
};

export default Detail;
