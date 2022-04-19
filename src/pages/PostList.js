import React, {useState}  from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import UserFixSection from "../components/UserFixSection";
import { actionCreators as postActions } from "../redux/modules/post";

import Modal from "../elements/Modal";
import InfoModal from "../components/InfoModal";
import { history } from "../redux/configureStore";
import Post from "../components/Post";

import Cookies from "universal-cookie";
import Header from "../components/Header";
const cookies = new Cookies();


const PostList = () => {
    //const post_list = useSelector((state) => state.post.posts);

    if(!cookies.get("myJwt")){
      history.replace("/")
    }
    
    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    //console.log(post_list)

    const [moreInfo, setMoreInfo] = useState(false);

    React.useEffect(() => {
    
      dispatch(postActions.getPostDB());
    
  }, []);

  // if(cookies.get("myJwt")){
  //   history.push("/postList")
  // } else {
  //   history.replace("/");
  // }


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

    // -- 로그인 유저 확인 및 데이터 요청 --
    // React.useEffect(() => {
      //const localData = localStorage.getItem("MY_LOCAL");
      // 유저 정보 확인
    //   if (!localData) {
    //     window.alert("로그인이 필요합니다");
    //     history.push("/");
    //   }
    // }, []);

   

  
    return (
      <>
      <Header></Header>
      <MainBox>
        <Section>
          <PostBox>
          {post_list.map((p, idx) => {
            return <Post key={idx} {...p} />;
            
          })}

          
             
    {/* {post.username === localStorage.getItem("username") && (
        <ModalArea
            style={{ color: "red", fontWeight: "900" }}
            onClick={deletePost}
            >
            삭제
        </ModalArea>
    )} */}
  {/* <TestBox><button onClick={() => setMoreInfo(true)}>info</button></TestBox>
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
        <ModalArea >   */}
        {/* onClick={() => setCommentModal(true)}  */}
            {/* 게시물로 이동 */}
        {/* </ModalArea>
        <ModalArea>공유 대상...</ModalArea>
        <ModalArea>링크 복사</ModalArea>
        <ModalArea>퍼가기</ModalArea>
        <ModalAreaLast  
            onClick={() => setMoreInfo(false)}
        >
        취소
        </ModalAreaLast>
                </Modal> */}

          </PostBox>
          <AsideBox>
            <UserFixSection />
          </AsideBox>
        </Section>
      </MainBox>
      </>
    );

}

export default PostList;

const MainBox = styled.div`
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
  height : 100vh;
`;

const Section = styled.div`
  width: 940px;
  height: 100%;
  display: flex;
  min-width: 700px;
  
`;
const PostBox = styled.div`
  width: 600px;

  margin-right: 28px;
  margin-top : 70px;
`;

const AsideBox = styled.div`
  width: 200px;
  position: fixed;
  left: calc(100vw - 37vw);
  top: 110px;
`;

const TestBox = styled.div`
  width: 100px;
  height: 100px;
  background-color : tomato;
`

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