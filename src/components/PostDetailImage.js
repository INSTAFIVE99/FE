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
            src="https://i.pinimg.com/564x/9b/10/2b/9b102bf530db433cc4a0f932e5482b02.jpg"
            size="100%"
            width="100%"
          />
      </Grid>
    </Grid>
  );
};

export default PostDetailImage;