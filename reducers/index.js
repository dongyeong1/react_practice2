import {HYDRATE} from 'next-redux-wrapper'
import { combineReducers } from 'redux'

import user from './user'
import post from './post'



//action
//state를 바꾸고싶을때 항상 action을 만들어서 store에서 action을이용해 dispatch를 한다 그러면 그바꾼 데이터가 reducer로 전달된다  
//그러면 기존state 말고 다음state가 만들어진다
// const changeNickname={
//     type:'CHANGE_NICKNAME',
//     data:'dong'
// }
// //action creator 동적으로 데이터받는다 
// const changeNicknames=(data)=>{
//     return{
//         type:'CHANGE_NICKNAME',
//     }
// }


//reducer는 이전상태와 액션을 이용해서 다음상태를 만든다 reload할때 reducer가 실행된다
const rootReducer=combineReducers({

    //ssr을 위해 index부분 들어감
    index:(state={},action)=>{
        switch(action.type){
            case HYDRATE:
                return {...state,...action.payload}      
            default:
                return state
        }

    },
    user,
    post

    
})
export default rootReducer