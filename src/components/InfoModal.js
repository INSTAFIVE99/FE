import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// import alert from "sweetalert";

import Modal from "../elements/Modal";

// import { BsThreeDots } from "react-icons/bs";
// import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from "react-icons/ai";
// import { IoMdPaperPlane } from "react-icons/io";
// import { IoChatbubbleOutline } from "react-icons/io5";
// import { RiBookmarkLine } from "react-icons/ri";
// import { CgSmile } from "react-icons/cg";

// import CommentDetail from "./CommentDetail";
// import { addCommentDB } from "../../redux/comment";
// import { addLikeDB } from "../../redux/like";
// import { deletePostDB } from "../../redux/post";

//swiper
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper.min.css";
// import "swiper/components/navigation/navigation.min.css";
// import SwiperCore, { Navigation, Pagination } from "swiper";


const InfoModal = () => {

    const deletePost = () => {
        alert({
          title: "지우시게요??",
          text: "복구할수 없어요!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
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

    const [moreInfo, setMoreInfo] = useState(false);
    
{/* 모달 */}

return(

    <Modal visible={moreInfo} width="400px" borderRadius="10px">
    <ModalArea style={{ color: "red", fontWeight: "900" }}>신고</ModalArea>
    
    {/* {post.username === localStorage.getItem("username") && (
        <ModalArea
            style={{ color: "red", fontWeight: "900" }}
            onClick={deletePost}
            >
            삭제
        </ModalArea>
    )} */}

    <ModalArea style={{ color: "red", fontWeight: "900" }}>
        팔로우
    </ModalArea>
    <ModalArea >  
    {/* onClick={() => setCommentModal(true)}  */}
        게시물로 이동
    </ModalArea>
    <ModalArea>공유 대상...</ModalArea>
    <ModalArea>링크 복사</ModalArea>
    <ModalArea>퍼가기</ModalArea>
    <ModalArea    
        onClick={() => setMoreInfo(false)}
    >
    취소
    </ModalArea>
    </Modal>

    )
{/* 모달 끝끝 */}


};

export default InfoModal;

const ModalArea = styled.div`
  height: 48px;
  border-bottom: 1px solid #999;
  display: ${(props) => (props.none ? "none" : "flex")};;
  text-align: center;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
`;