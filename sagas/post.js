import { all, delay, put, takeLatest,fork ,throttle,call} from "redux-saga/effects";
import axios from 'axios'
import {
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    generateDummyPost,
    LIKE_POST_FAILURE,
  LIKE_POST_REQUEST, LIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS,
    LOAD_POSTS_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    REMOVE_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
  } from '../reducers/post';
import { ADD_POST_TO_ME ,REMOVE_POST_OF_ME} from "../reducers/user";
import shortid from "shortid";


function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`);
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function unlikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostsAPI(data) {
    return axios.get('/posts', data);
  }
  
  function* loadPosts(action) {
    try {
      const result = yield call(loadPostsAPI, action.data);
      yield put({
        type: LOAD_POSTS_SUCCESS,
        data:result.data
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: LOAD_POSTS_FAILURE,
        data: err.response.data,
      });
    }
  }
   

function addPostAPI(data){
return axios.post('/post',{content:data})
}

function* addPost(action){
     try{
      const result=yield call (addPostAPI,action.data)

        yield put({
            type:ADD_POST_SUCCESS,
            data:result.data
           
        })
        yield put({
            type:ADD_POST_TO_ME,
            data:result.data.id
        })
    }catch(err){
        yield put({
            type:ADD_POST_FAILURE,
            data:err.response.data,
        })
    }
}

function removePostAPI(data){
    return axios.post('/api/post',data)
}

function* removePost(action){ 
     
     try{
        yield delay(1000)
        yield put({
            type:REMOVE_POST_SUCCESS,
            data:action.data
        })
        yield put({
            type:REMOVE_POST_OF_ME, 
            data:action.data
        })
    }catch(err){
        yield put({
            type:REMOVE_POST_FAILURE,
            data:err.response.data,
        })
    }
}

//3번
function addCommentAPI(data) {
    return axios.post(`/post/${data.postId}/comment`, data);
  }
//2번
  function* addComment(action) {
    try {
      const result = yield call(addCommentAPI, action.data);
     //4번
      yield put({
        type: ADD_COMMENT_SUCCESS,
        data: result.data,
      });
    } catch (err) {
        console.error(err)
      yield put({
        type: ADD_COMMENT_FAILURE,
        data: err.response.data,
      });
    }
  }
  
 //1번
function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST,addPost)
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST,addComment)
}

function* watchRemvoePost(){
    yield takeLatest(REMOVE_POST_REQUEST,removePost)
}

function* watchLoadPosts(){
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
    //throttle은 5초동안 다른리퀘스트를 한번제와하고 성공안시키지만 요청들이 쏟아졌을때 5초뒤에 딴 요청을 성공시킨다.
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}


export default function* postSaga(){
    yield all([
      fork(watchLikePost),
      fork(watchUnlikePost),
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchRemvoePost),
        fork(watchLoadPosts),  
      ])
}