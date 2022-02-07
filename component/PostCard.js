import React,{useCallback, useState} from 'react';
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Avatar, Popover,List,Comment} from 'antd';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
// import PostImages from './PostImages';
import CommentForm from './CommentForm';
import { REMOVE_POST_REQUEST ,LIKE_POST_FAILURE,
  LIKE_POST_REQUEST, LIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS,} from '../reducers/post';
import FollowButton from './FollowButton'

const PostCard=({post})=> {
    const id =useSelector((state)=>state.user.me && state.user.me.id)
    const liked=post.Likers.find((v)=>v.id===id)

    const {removePostLoading}=useSelector((state)=>state.post)

    const dispatch=useDispatch();

    // const[liked,setLiked]=useState(false);
    const [commentFormOpened,setCommentFromOpened]=useState(false)

    const onLike=useCallback(()=>{
        dispatch({
          type:LIKE_POST_REQUEST,
          data:post.id
        })
    },[])

    const onUnLike=useCallback(()=>{
      dispatch({
        type:UNLIKE_POST_REQUEST,
        data:post.id
      })
    },[])

    const onToggleComment =useCallback(()=>{
        setCommentFromOpened((prev)=>!prev)
    },[])
    
    const onRemovePost=useCallback(()=>{
      console.log('asdasd')
       dispatch({
         type:REMOVE_POST_REQUEST,
         data:post.id, 
       })
    },[] )
  return (
    <div style={{marginBottom:10}}>
      <Card
      // cover={post.Images[0] && <PostImages images={post.Images} />}
      
      actions={[
        <RetweetOutlined key="retweet" />,
        liked?<HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnLike}/>:<HeartOutlined key="heart" onClick={onLike} />,
        <MessageOutlined key="message"  onClick={onToggleComment} />,
        //popover는 ...에 마우스올렸을때 더보기뜨는것
        <Popover
          key="ellipsis"
          content={(
            <Button.Group>
              {id && post.User.id === id
                ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                  </>
                )
                : <Button>신고</Button>}
            </Button.Group>
          )}
        >
          <EllipsisOutlined />
        </Popover>,
      ]}
      extra={id &&<FollowButton post={post} />}
      >
          <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={post.content}
          />
          </Card>
          {commentFormOpened && (
              <div>
                  <CommentForm post={post} />
                  <List
                     header={`${post.Comments.length}개의 댓글 `}
                     itemLayout='horizontal'
                     dataSource={post.Comments}
                     //item은 post.Comments안에있는 요소하나하나
                     renderItem={(item)=>(
                         <li>
                             <Comment 
                             author={item.User.nickname}
                             avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                             content={item.content}
                              />

                             
                         </li>
                     )}
                  />
              </div>
          )}
        {/* <Image /> */}
        {/* <Content /> */}
        {/* <Buttons />  */}
      
        {/* <CommentForm/> */}
        {/* <Comment/> */}
    </div>
  )
}

PostCard.propTypes = {
    post: PropTypes.shape({
      id: PropTypes.number,
      User: PropTypes.object,
      content: PropTypes.string,
      createdAt: PropTypes.string,
      Comments: PropTypes.arrayOf(PropTypes.object),
      Images: PropTypes.arrayOf(PropTypes.object),
      Likers:PropTypes.arrayOf(PropTypes.object)
    }).isRequired,
  };

export default PostCard;
