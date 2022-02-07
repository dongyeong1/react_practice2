import React from 'react'
import propTypes from 'prop-types'
import Link from 'next/link'
import {Menu,Input,Row,Col} from 'antd'
import UserProfile from './userProfile'
import LoginForm from './LoginFrom'
import {useSelector} from 'react-redux'


function AppLayout({children}) {

    // const [isLoggedIn,setIsLoggedIn]=useState(false)

    const {me}=useSelector((state)=>state.user)//값을가져오기위해서 useSelector 쓴다
    //isLoggedIn이 바뀌면 rerendering이 된다

    return (
        <div>
            <Menu mode="horizontal">
            <Menu.Item>
                <Link href="/"><a>메인페이지</a></Link>

                </Menu.Item>

                <Menu.Item>
                <Link href="/profile"><a>프로필</a></Link>

                </Menu.Item>
                <Menu.Item>
                <Link href="/signup"><a>회원가입</a></Link>

                </Menu.Item>

                <Menu.Item>
                    검색하기
                <Input.Search enterButton style={{verticalAlign:'middle' ,marginLeft:'10px'}}/>

                </Menu.Item>
              


            </Menu>
            <Row gutter={12}>
                {/* <Col span={12}>asd</Col>
                <Col span={12}>asds</Col> */}
                <Col xs={24} md={6}>
                    {me? <UserProfile></UserProfile>:<LoginForm></LoginForm>}
                </Col>
                <Col xs={24} md={18}>{children}</Col>
                <Col xs={24} md={6}>sa</Col>

            </Row>
            
        </div>
    )
}
AppLayout.propTypes={
    children:propTypes.node.isRequired,
}

export default AppLayout
