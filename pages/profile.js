import React, { useEffect } from 'react'
import AppLayout from '../component/AppLayout'
import NicknameEditForm from '../component/NicknameEditForm'
import FollowList from '../component/FollowList'
import { useSelector } from 'react-redux'
import Router from 'next/router '

function profile() {

  const {me}=useSelector((state)=>state.user)


  useEffect(()=>{
    if(!(me&&me.id)){
      Router.push('/')
    }
  })
  if(!me){
    return null
  }

    
    return (
      <>
      <AppLayout>
          <NicknameEditForm></NicknameEditForm>
          <FollowList header="팔로잉목록" data={me.Followings}></FollowList>
          <FollowList header="팔로위목록" data={me.Followers}></FollowList>
      </AppLayout>
      </>
    )
}

export default profile
