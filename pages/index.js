import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppLayout from '../component/AppLayout'
import PostForm from '../component/PostForm'
import PostCard from '../component/PostCard'
import { LOAD_POSTS_REQUEST } from '../reducers/post'
import { LOAD_USER_REQUEST } from '../reducers/user';


function index() {
    const {me} =useSelector((state)=>state.user);
    const {mainPosts,hasMorePosts,loadPostsLoading}=useSelector((state)=>state.post)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch({
            type:LOAD_POSTS_REQUEST
        })
    },[])

    useEffect(() => {
        dispatch({
          type: LOAD_USER_REQUEST,
        });
       
      }, []);
    

    useEffect(()=>{
        function onScroll(){
            if(window.scrollY+document.documentElement.clientHeight>document.documentElement.scrollHeight-300){
                if(hasMorePosts && !loadPostsLoading){
                    dispatch({
                        type:LOAD_POSTS_REQUEST
                    })
                   }
            }
        }
        window.addEventListener('scroll',onScroll)
        return()=>{
        window.removeEventListener('scroll',onScroll)    
        }
        },[hasMorePosts,loadPostsLoading])
  
    return (
        <AppLayout>
            {me  &&<PostForm />}
           {mainPosts.map((post)=> <PostCard post={post} key={post.id}/> )}
        </AppLayout>
        
    )
}

export default index
