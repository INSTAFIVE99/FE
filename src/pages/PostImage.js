import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { history } from "../redux/configureStore";
import { Grid, Text } from "../elements/index";
import file from "../imgs/file.png";
// import Upload from "../shared/Upload";
import FileUpload from "../shared/FileUpload";

import { useSelector, useDispatch } from "react-redux";

const PostWrite = (props) => {

//   const reloadState = useSelector((state) => {
//     console.log(state);
//     return state.post.reloadState;
//   });

//스크롤 숨기기
React.useEffect(() => {

    document.body.classList.add("overflowHidden");
    window.scrollTo(0, 0);
    return () => {
      document.body.classList.remove("overflowHidden");
    };
  }, []);

  return (
    <>
      {/* 배경 */}
      <Grid
        width="100%"
        height="100vh"
        margin="auto"
        background="rgba(0, 0, 0, 0.8)"
        position="absolute"
        top="0"
        left="0"
        zIndex="11"
        is_center
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
        {/* 박스(흰색)  */}
        <Grid
          width="641px"
          height="750px"
          margin="100px auto 0 auto"
          background="#fff"
          radius="10px"
        >
          {/* 제목 */}
          <Grid borderB="1px solid #dbdbdb" height="37px">
            <Text
              padding="10px 0"
              textAlign="center"
              size="16px"
              bold
            >
              새 게시물 만들기
            </Text>
          </Grid>
          <Grid>
            <Icon src={file} alt="file" />
            <Text textAlign="center" size="20px">
              사진을 여기에 끌어다 놓으세요
            </Text>
            <FileUpload />
          </Grid>
        </Grid>
      </Grid>
      </>
  );
};

const Icon = styled.img`
  width: 120px;
  margin: 200px auto 0 auto;
  display: flex;
`;

export default PostWrite;