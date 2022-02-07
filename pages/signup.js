import React,{useCallback,useEffect,useState} from 'react'
import AppLayout from '../component/AppLayout'
import {Form,Input,Checkbox,Button} from 'antd'
import useInput from '../hooks/useInput';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router'


function signup() {
    const dispatch=useDispatch();
    const {signUpLoading,signUpDone,signUpError,me}=useSelector((state)=>state.user)

    const [email,onChangeEmail]=useInput('');
    const [nick,onChangeNick]=useInput('');
    const [password,onChangePassword]=useInput('');

    const[passwordError,setPasswordError]=useState(false)

    const [passwordCheck,setPasswordCheck]=useState('')
    const onChangePasswordCheck=useCallback((e)=>{
        setPasswordCheck(e.target.value)
        setPasswordError(e.target.value!==password)
    },[password])

    const [term,setTerm]=useState('')
    const [termError,setTermError]=useState(false)

    const onChangeTerm=useCallback((e)=>{
        setTerm(e.target.checked)
        setTermError(false)
    },[])



  useEffect(()=>{
    if(!(me&&me.id)){
      Router.push('/')
    }
  })


    useEffect(()=>{
        if(signUpDone){
            Router.push('/')
        }
    },[signUpDone])

    useEffect(()=>{
        if(signUpError){
            alert(signUpError)
        }
    },[signUpError])

    
    

  
    

    const onSubmit=useCallback(()=>{
        if(password!==passwordCheck){
            return setPasswordError(true)
        }
        if(!term){
            return setTermError(true);
        }
        console.log(email,nick,password)
        dispatch({
            type:SIGN_UP_REQUEST,
            data:{email,password,nick}
        })

    },[email,password,passwordCheck,term] )
    return (
        <AppLayout>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor='user-email'>이메일 </label>
                    <br></br>
                    <Input type="email" name="user-email" value={email} onChange={onChangeEmail} required></Input>
                </div>
                <div>
                    <label htmlFor='user-id'>닉네임 </label>
                    <br></br>
                    <Input name="user-id" value={nick} onChange={onChangeNick} required></Input>
                </div>
                <div>
                    <label htmlFor='user-id'>비밀번호 </label>
                    <br></br>
                    <Input type="password" name="user-id" value={password} onChange={onChangePassword} required></Input>
                </div>
                <div>
                    <label htmlFor='user-id'>비밀번호확인 </label>
                    <br></br>
                    <Input name="user-id" type="password" value={passwordCheck} onChange={onChangePasswordCheck} required></Input>
                    {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
                </div>

                <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>제로초 말을 잘 들을 것을 동의합니다.</Checkbox>
          {termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
        </div>
        <div style={{marginTop:10}}>
            <Button type='primary' htmlType='submit' loading={signUpLoading}>가입하기</Button>
        </div>

             </Form>
        </AppLayout>
    )
}

export default signup
