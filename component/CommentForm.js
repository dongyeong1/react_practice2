import React, { useCallback,useEffect } from 'react';
import {Form, Input,Button} from 'antd'
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput';
import { useSelector,useDispatch } from 'react-redux';
import {ADD_COMMENT_REQUEST} from '../reducers/post'

function CommetForm({post}) {

    const dispatch =useDispatch();
    const {addCommentDone,addCommentLoading}=useSelector((state)=>state.post)
    const id=useSelector((state)=>state.user.me?.id)
  
    const [commentText,onChangeCommentText,setValue]=useInput('');
    
    const onSubmitComment=useCallback(()=>{

        dispatch({
            type:ADD_COMMENT_REQUEST,
            data:{
                content:commentText,
                postId:post.id,
                userId:id,
                
            }
        })
    },[commentText,id])

    useEffect(()=>{
        if(addCommentDone){
            setValue('')
        }
    },[addCommentDone])

    return( 


  <Form onFinish={onSubmitComment}>
      <Form.Item style={{position:'relative' ,margin:0 ,zIndex:1}}>
          <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
          <Button type="primary" htmlType='submit' style={{position:'absolute' ,right:0,bottom:-40}} loading={addCommentLoading}>짹짹</Button>
      </Form.Item>
  </Form>);
}

CommetForm.PropTypes={
    post:PropTypes.object.isRequired,
};


export default CommetForm;
