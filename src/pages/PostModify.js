import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmileWink } from "@fortawesome/free-regular-svg-icons";

import styled from "styled-components";
import { Grid, Text, Image } from "../elements/index";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

import { history } from "../redux/configureStore";

import Cookies from "universal-cookie";

import profileImage from "../imgs/header/header_09.png";


const PostModify = (props) => {
    const cookies = new Cookies();
    const username = cookies.get("username");
  
    const dispatch = useDispatch();

    const post_id = props.match.params.id;
    const postOne = useSelector((state) => state.post.target);


    const fileInput = React.useRef();


    const selectFile = (e) => {

        const file = fileInput.current.files[0];

        //FileReader 객체 생성
        const reader = new FileReader();
        reader.readAsDataURL(file);

        //파일 로드 완료시
        reader.onloadend = (e) => {
        const preview = reader.result;

        //리덕스 preview 저장
        
        setImgPreview(preview);

        dispatch(imageActions.setPreview(preview, file)); 

     };
   };



  //이미지 프리뷰
  const preview = useSelector((state) => state.image.preview);

  const file = useSelector((state) => state.image.file);

  const [contents, setContents] = React.useState(postOne ? postOne.contents : "");
  const [imgPreview, setImgPreview] = React.useState(postOne ? postOne.imgUrl : file)


  //body 스크롤 멈추기
  React.useEffect(() => {
    dispatch(postActions.getPostOneDB(post_id));

    dispatch(imageActions.setPreview(preview, file));

    document.body.classList.add("overflowHidden");
    window.scrollTo(0, 0);
    return () => {
      document.body.classList.remove("overflowHidden");
    };

  }, []);

  //---- 게시글 수정 ----
  const modifyPost = () => {
    dispatch(postActions.modifyPostDB(post_id, {contents : contents, file : file}));
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
            history.replace(`/postList`);
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
        >
          {/* 제목 */}
          <Grid borderB="1px solid #dbdbdb" is_flex>
            <IconBox>
                    <Grid justify="center" flex margin="24px 0">
                        <Label htmlFor="file">컴퓨터에서 선택</Label>

                            <File
                        type="file"
                        id="file"
                        accept="image/*"
                        onChange={selectFile}
                        ref={fileInput}

                        ></File>
                    </Grid>
            </IconBox>
            <Text
              padding="10px 0"
              align="center"
              background="red"
              size="15px"
              weight="bold"
            >

            </Text>
            <Button onClick={modifyPost}>수정 완료</Button>
          </Grid>
          <Grid flex>
            {/* 왼쪽 - 이미지 */}

            <Grid width="695px" height="529px" flex is_center>
              <Image shape="rectangle" width="100%" height="528px" src={imgPreview} />
            </Grid>

            {/* 오른쪽 - 텍스트 입력창 */}
            <Grid width="380px" height="529px" borderL="1px solid #dbdbdb">
              <Grid flex alignItems="center" padding="25px 16px">
                <Image
                  shape="circle"
                  src={profileImage}
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
                value={contents}
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

PostModify.defaultProps = {
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

const Label = styled.label`
  padding: 5px 9px;
  margin: 10px 10px;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #0095f6;
  color: #fff;
  height:20px;
  font-size : 14px;
  font-weight : 700;
`;

const File = styled.input`

  width: 0px;
  height: 0px;
  overflow: hidden;
`;

export default PostModify;
