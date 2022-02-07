import React,{useCallback,useRef, useEffect} from 'react';
import {Form,Input,Button} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {addPost} from '../reducers/post'

import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';

import useInput from '../hooks/useInput';


function PostForm() {

    const imageInput=useRef();
    const[text,onChangeText,setText]=useInput('')


    const {addPostDone}=useSelector((state)=>state.post)

    

    useEffect(()=>{
if(addPostDone){
    setText('')
}
    },[addPostDone])

    const dispatch=useDispatch();
    const {imagePaths} =useSelector((state)=>state.post)
    


    const onClickImageUpload=useCallback(()=>{
        imageInput.current.click()
    },[imageInput.current])

    const onSubmit=useCallback(()=>{
        const formData = new FormData();
        formData.append('content', text);
        console.log('textss',text)
        dispatch({
            type: ADD_POST_REQUEST,
            data: text,       
        })
        // setText('');

    },[text])

  return (
      <Form style={{margin:'10px 0 20px'}} encType='multipart/form-data' onFinish={onSubmit}>
        <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder='어떤일이있었나요?' />
        <div>
            <input type="file" multiple hidden ref={imageInput} />
                <Button onClick={onClickImageUpload}>이미지업로드</Button>
                <Button type="primary" htmlType="submit" style={{float:'right'}}>짹짹</Button>
            
            
        </div>
        <div>
            {imagePaths.map((v)=>(
                <div key={v} style={{display:'inline-block'}}>
                    <img src={v} style={{width:'200px'}} alt={v}></img>
                </div>
            ))}
        </div>
        
      </Form>
  );
}

export default PostForm;
