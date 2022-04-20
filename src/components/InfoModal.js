import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../elements/Modal";


const InfoModal = () => {

    const [moreInfo, setMoreInfo] = useState(false);
    
return(

    <Modal visible={moreInfo} width="400px" borderRadius="10px">
    <ModalArea style={{ color: "red", fontWeight: "900" }}>신고</ModalArea>
    

    <ModalArea style={{ color: "red", fontWeight: "900" }}>
        팔로우
    </ModalArea>
    <ModalArea >  

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