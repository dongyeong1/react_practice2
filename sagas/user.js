import { Result } from 'antd';
import { actionChannel, all, delay, fork, put, takeLatest,call} from 'redux-saga/effects'
import signup from '../pages/signup';
import axios from 'axios'
import {
    FOLLOW_FAILURE,
    FOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    UNFOLLOW_FAILURE,
    UNFOLLOW_REQUEST,
    UNFOLLOW_SUCCESS,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    LOAD_USER_REQUEST
    
  } from '../reducers/user';
  

function logInAPI(data){
    return axios.post('/user/login',data) 
}

function* login(action){
  const result=yield call(logInAPI,action.data)

    try{
        yield put({
            type:LOG_IN_SUCCESS,
            data:result.data 
        })
    }
    catch(err){
        yield put({
            type:LOG_IN_FAILURE,
            error:err.response.data,
             
        })
    }

}


function loadUserAPI() {
  return axios.get('/user');
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    });
  }
}


function logOutAPI(){
    return axios.post('/user/logout')
}

function* logout(){
    try{
        yield call(logOutAPI)
        yield put({
            type:LOG_OUT_SUCCESS,
        })
    }catch(err){
        yield put({
            type:LOG_OUT_FAILURE,
            error:err.response.data,
             
        })
    }

}

function signUpAPI(data){
    return axios.post('/user',data)
}


function* signUp(action){
    try{
      const result=yield call(signUpAPI,action.data)
      console.log(result)
        yield put({
            type:SIGN_UP_SUCCESS,
        })
    }catch(err){
        yield put({
            type:SIGN_UP_FAILURE,
            error:err.response.data,
             
        })
    }

}

function followAPI() {
    // return axios.post('/api/follow');
  }
  
  function* follow(action) {
    try {
      // const result = yield call(followAPI);
      yield delay(1000);
      yield put({
        type: FOLLOW_SUCCESS,
        data: action.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: FOLLOW_FAILURE,
        error: err.response.data,
      });
    }
  }
  
  function unfollowAPI() {
    // return axios.post('/api/unfollow');
  }
  
  function* unfollow(action) {
    try {
      // const result = yield call(unfollowAPI);
      yield delay(1000);
      yield put({
        type: UNFOLLOW_SUCCESS,
        data: action.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: UNFOLLOW_FAILURE,
        error: err.response.data,
      });
    }
  }

function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
  }
  
  function* watchUnfollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
  }

function* watchLogIn(){
    yield takeLatest(LOG_IN_REQUEST,login)

}
function* watchLogOut(){
    yield takeLatest(LOG_OUT_REQUEST,logout)
}

function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST,signUp)
}
function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}


export default function* userSaga(){
    yield all([
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchLoadUser),
    ])
}