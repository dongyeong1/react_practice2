import React,{useCallback}from 'react'
import {Card,Avatar,Button} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {  logoutRequestAction} from '../reducers/user';

function userProfile() {

    const dispatch=useDispatch();
    const {me,logOutLoading}=useSelector((state)=>state.user)

  
    const onLogoutForm=useCallback(()=>{
       
        dispatch(logoutRequestAction())
    },[])

    return (
        <div>
            <Card
               actions={[
                <div key="twit">게시물수<br/>{me.Posts.length}<br/></div>,
                <div key="following">팔로잉<br/>{me.Followings.length}</div>,

                <div key="follower">팔로워<br/>{me.Followers.length}</div>

            ]}  
         
            >
                <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
                />

                
            </Card>
            <Button onClick={onLogoutForm} loading={logOutLoading}> 로그아웃</Button>
            
        </div>
    )
}

export default userProfile
