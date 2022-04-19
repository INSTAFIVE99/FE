import React from "react";
import styled from "styled-components";
import { Grid, Text, Input, Button, Image } from "../elements/index";
// import { useDispatch, useSelector } from "react-redux";

const PostDetailImage = (props) => {

   // const postOne = useSelector((state) => state.image.target);

  return (
    <Grid width="60%">
      <Grid>
          <Image
            shape="rectangle"
            // src={postOne.result.upload[0].path}
            src={props.imgUrl}
            size="100%"
            width="100%"
            height="650px"
          />
      </Grid>
    </Grid>
  );
};

export default PostDetailImage;