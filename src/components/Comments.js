import React , { useState } from 'react';
import styled from "styled-components";
import {Grid, Input, Image, Text} from "../elements/index"
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";


// import controlComment from "" 



const CommentsBox = (props) => {
    const dispatch = useDispatch(); 

    // dispatch(postActions.getPostOneDB(post_id));
    
    const post_id = props.id;

    const postOne = useSelector((state) => state.post.target);
    console.log("bbb", postOne)
    console.log("bbb", postOne.user.nickname)

    const usernickname = postOne.user.nickname;

    console.log(props.postId)
    // const post_ID = ;


    
    // 이거 어디서 어떻게 받아옴..
    const putcomment = useSelector(props=> props.comment);
    const putcommentId = useSelector(props=> props.post_id);
    


    return (
        <CommentBox>
            <Text
            bold="800"
            >{usernickname}</Text>
            <Text>{putcomment}</Text>
        </CommentBox>
    );
};

export default CommentsBox;

const CommentBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
`