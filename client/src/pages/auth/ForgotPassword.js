import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../../firebase'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'


const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const { user } = useSelector((state) => ({ ...state }))
    const history = useHistory()

    useEffect(() => {
        if (user && user.token) {
            history.push('/')
        }
    }, [user, history])



    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true)
        var config = {
            url: process.env.REACT_APP_FORGOT_REDIRECT_URL,
            handleCodeInApp: true,

        };

        await auth.sendPasswordResetEmail(email, config).then((result) => {
            setLoading(false)
            toast.success('check your email for password reset mail')
            setEmail("")

        }).catch((err) => {
            setLoading(false)

            toast.error(err.message)
        })


    }

    const ForgotPasswordForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your email" autoFocus />
            <br />
            <button type="submit" className="btn btn-raised">Send Reset Password Mail</button>

        </form>


    );


    return (
        <div className="container p-5">

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (<h4 className="text-danger">Loading</h4>) : (<h4>Forgot Password</h4>)}
                    {ForgotPasswordForm()}
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
