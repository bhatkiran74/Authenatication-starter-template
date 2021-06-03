import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { auth, googleAuthProvider, faceAuthProvider } from '../../firebase'
import { Button } from 'antd'
import { MailOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { createOrUpdateUser } from '../../function/auth'









const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useSelector((state) => ({ ...state }))
    useEffect(() => {
        if (user && user.token) {
            history.push('/')
        }
    }, [user, history])




    const roleBasedRedirect = (res) => {
        if (res.data.role === 'admin') {
            history.push("/admin/dashboard")
        }
        else {
            history.push("/user/dashboard");
        }


    }




    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log(email, password);

        setLoading(true)



        try {

            const result = await auth.signInWithEmailAndPassword(email, password)

            const { user } = result
            const idTokenResult = await user.getIdTokenResult();


            createOrUpdateUser(idTokenResult.token).then((res) => {
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                        name: res.data.name,
                        email: res.data.email,
                        token: idTokenResult.token,
                        role: res.data.role,
                        _id: res.data._id
                    }
                })


                roleBasedRedirect(res);



            }).catch((err) => {
                console.log(err);
            })


            toast.success(`Successfully login with ${email}`)
            // history.push('/')

        } catch (err) {

            setLoading(false)
            toast.error(err)
        }

    }
    const googleLogin = async () => {

        await auth.signInWithPopup(googleAuthProvider).then(async (result) => {
            const { user } = result
            const idTokenResult = await user.getIdTokenResult();


            createOrUpdateUser(idTokenResult.token).then((res) => {
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                        name: res.data.name,
                        email: res.data.email,
                        token: idTokenResult.token,
                        role: res.data.role,
                        _id: res.data._id
                    }
                })

                toast.success(`Successfully login with ${email}`)
                roleBasedRedirect(res);

            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {

            toast.error(err)
        })
    }


    const facebookLogin = async () => {

        await auth.signInWithPopup(faceAuthProvider).then(async (result) => {
            const { user } = result
            const idTokenResult = await user.getIdTokenResult();

            console.log(user);
            createOrUpdateUser(idTokenResult.token).then((res) => {
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                        name: res.data.name,
                        email: res.data.email,
                        token: idTokenResult.token,
                        role: res.data.role,
                        _id: res.data._id
                    }
                })

                toast.success(`Successfully login with ${email}`)
                roleBasedRedirect(res);

            }).catch((err) => {
                console.log(err);
            })


        }).catch((err) => {

            toast.error(err)
        })



    }



    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoFocus />
            </div>

            <div className="form-group">
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoFocus />
            </div>            <br />
            <Button type="primary" onClick={handleSubmit} shape="round" icon={<MailOutlined />} size='large' className="btn btn-raised" disabled={!email || password.length < 6} block>Login with Email & password</Button>
            <Link to="/forgot/password" className="float-right text-danger ">Forgot Password</Link>
        </form>


    );


    return (
        <div className="container p-5">

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (<h4 className="text-danger">Loading...</h4>) : (<h4>Login</h4>)}
                    {loginForm()}


                    <Button type="danger" onClick={googleLogin} shape="round" icon={<GoogleOutlined />} size='large' className="btn btn-raised my-3" block>Login with Google</Button>

                    <Button type="primary" onClick={facebookLogin} shape="round" icon={<FacebookOutlined />} size='large' className="btn btn-raised" block>Login with Facebook</Button>
                </div>
            </div>
        </div>
    )
}

export default Login
