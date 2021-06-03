import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import { Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import { UserAddOutlined, AppstoreOutlined, LoginOutlined, UnorderedListOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

const { SubMenu, Item } = Menu;




const Header = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }))
    const history = useHistory()

    const [current, setCurrent] = useState('')



    const handleClick = (e) => {
        console.log(e.key);


    }


    const logout = () => {

        firebase.auth().signOut()
        dispatch({
            type: "LOGOUT",
            payload: null
        })
        toast.success(`successfully logout`)
        history.push('/login')
    }




    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" onChange={(e) => { setCurrent(e.target.value) }}>


            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/"> Home</Link>

            </Item>

            {!user && (<Item key="register" className="float-right" icon={<UserAddOutlined />}>
                <Link to="/register"> Regster</Link>
            </Item>)}

            {!user && (<Item key="login" className="float-right" icon={<LoginOutlined />}>
                <Link to="/login"> Login</Link>
            </Item>)}


            {user && (<SubMenu icon={<UserOutlined />} className="float-right" title={user.email && user.email.split("@")[0]}>

                <Item key="dashboard" icon={<UnorderedListOutlined />} >Dashboard</Item>
                <Item key="logout" icon={<LogoutOutlined />} onClick={logout} >Logout</Item>


            </SubMenu>)}

        </Menu>
    )
}

export default Header
