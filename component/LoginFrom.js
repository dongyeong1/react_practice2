import React,{useCallback, useEffect} from 'react'
import { Form,Input,Button } from 'antd';
import Link from 'next/link'
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';





const LoginFrom=() =>{
    const dispatch=useDispatch();
    const {logInLoading,logInError} =useSelector((state)=>state.user)
    const [email,onChangeEmail]=useInput('')

    const [password,onChangePassword]=useInput('')

   useEffect(()=>{
       if(logInError){
           alert(logInError)
       }
   },[logInError])

    

    const onSubmitForm=useCallback(()=>{
        console.log(email,password)
        dispatch(loginRequestAction({
            email,password
        }))
        // setIsLoggedIn(true)
    },[email,password])

    

    
    return (
        //리액트가 새로고침되면 원래랑 다른부분이 리렌더링된다
        <Form onFinish={onSubmitForm}>
        <div>
            <label htmlFor='user-email'>이메일 </label>
            <br></br>
            <Input type="email"  name="user-email" value={email} onChange={onChangeEmail} required></Input>
        </div>
        <div>
            <label htmlFor='user-password'>비밀번호 </label>
            <br></br>
            <Input name="user-password" type="password" value={password} onChange={onChangePassword} required></Input>
        </div> 
        <div style={{marginTop:'10px'}}>
            <Button type="primary" htmlType='submit' loading={logInLoading} >로그인</Button>
            <Link href="/signup"><a><Button>회원가입</Button></a></Link>
        </div>
        </Form>
    )
}

export default LoginFrom
