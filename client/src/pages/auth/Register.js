import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../../firebase'


const Register = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {

        e.preventDefault();


        // console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL);
        var config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,

        };

        await auth.sendSignInLinkToEmail(email, config).then(() => {
            toast.success(
                `Email is send to ${email}. click the link to complete your registration `
            );
        }).catch((err) => {
            toast.error(err)
        })

        window.localStorage.setItem('emailForSignIn', email);
        setEmail('')

    }

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your email" autoFocus />
            <br />
            <button type="submit" className="btn btn-raised">Register</button>

        </form>


    );


    return (
        <div className="container p-5">

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Registration</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    )
}

export default Register
