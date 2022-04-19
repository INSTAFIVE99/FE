import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmileWink } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import { Grid, Text, Image } from "../elements/index";
import { actionCreators as postActions } from "../redux/modules/post";

import { history } from "../redux/configureStore";

import Cookies from "universal-cookie";
const cookies = new Cookies();
const username = cookies.get("username")

const PostWrite = () => {
  const dispatch = useDispatch();

  //upload 데이터 가져오기
  const preview = useSelector((state) => state.image.preview);
  //console.log(preview); //data:image/png.base64,iVOR.....
  const file = useSelector((state) => state.image.file);
  //console.log(file);
  const [contents, setContents] = React.useState("");

  //body 스크롤 멈추기
  React.useEffect(() => {
    document.body.classList.add("overflowHidden");
    window.scrollTo(0, 0);
    return () => {
      document.body.classList.remove("overflowHidden");
    };

  }, []);

  //---- 게시글 추가 ----
  const addPost = () => {
    dispatch(postActions.addPostDB({contents : contents, file : file}));
  
  };


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
          width="1035px"
          height="579px"
          margin="100px auto 0 auto"
          background="#fff"
          radius="10px"
          position="relative"
          // direction="column"
        >
          {/* 제목 */}
          <Grid borderB="1px solid #dbdbdb" is_center>
            <IconBox>
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{
                  position: "absolute",
                  top: "15px",
                  left: "16px",
                  color: "#333",
                  height: "20px",
                }}
                onClick={() => {
                  history.push(`/postImage`);
                }}
              />
            </IconBox>
            <Text
              padding="10px 0"
              align="center"
              background="red"
              size="15px"
              weight="bold"
            >
              새 게시물 만들기
            </Text>
            <Button onClick={addPost}>공유하기</Button>
          </Grid>
          <Grid flex>
            {/* 왼쪽 - 이미지 */}

            <Grid width="695px" height="529px" flex is_center>
              <Image shape="rectangle" width="100%" height="528px" src={preview} />
            </Grid>

            {/* 오른쪽 - 텍스트 입력창 */}
            <Grid width="380px" height="529px" borderL="1px solid #dbdbdb">
              <Grid flex alignItems="center" padding="25px 16px">
                <Image
                  shape="circle"
                  src="http://www.goingmary.co.kr/shop/data/images/icons/basic_user.png"
                />
                <Text bold padding="0 0 0 10px" fontWeight="bold">
                  {username}
                </Text>
              </Grid>

              <Textarea
                placeholder="문구입력..."
                onChange={(e) => {
                  setContents(e.target.value);
                }}
              />

              <Grid borderB="1px solid #dbdbdb" padding="0" flex alignItems="center">
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

PostWrite.defaultProps = {
  posts: {
    id: 0,
    content: "내용내용",
    uploadUrl: "",
    type: "",
    createAt: "",
    updatedAt: "",
    user_profile: "https://mean0images.s3.ap-northeast-2.amazonaws.com/4.jpeg",
    user_name: "seora",
  },
};
const Button = styled.button`
  size: 14px;
  color: #0095f6;
  font-weight: bold;
  width: 10;
  position: absolute;
  top: 20px;
  right: 16px;
  border: none;
  width: auto;
  background: none;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Textarea = styled.textarea`
  border: none;
  width: 95%;
  margin-left: 5px;
  height: 300px;
  resize: none;
  spellcheck: false;

  &:focus {
    outline: none;
    spellcheck: false;
  }
`;

export default PostWrite;
