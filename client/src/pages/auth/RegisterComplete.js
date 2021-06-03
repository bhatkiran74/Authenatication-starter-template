import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'

import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { createOrUpdateUser } from '../../function/auth'









const RegisterComplete = () => {

    let history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    //redux
    // const { user } = useSelector((state) => ({ ...state }))

    const dispatch = useDispatch()



    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForSignIn'))
    }, [])




    const handleSubmit = async (e) => {
        e.preventDefault();

        // validation
        if (!email || !password) {
            toast.error("Email and password is required");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {

            var result = await auth.signInWithEmailLink(email, window.location.href)
            console.log(result);


            if (result.user.emailVerified) {

                //remove user email from localstorage
                window.localStorage.removeItem('emailForSignIn');
                //get user id tocken

                let user = auth.currentUser;

                await user.updatePassword(password);

                const idTokenResult = await user.getIdTokenResult();


                //redux store and
                console.log("user", user, "idtocken", idTokenResult);
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
                    history.push('/')

                }).catch((err) => {
                    console.log(err);
                })
            }

        } catch (err) {
            toast.error(err.message)
        }






    }


    const registerCompleteForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="email" className="form-control" value={email} disabled />
            <br />
            <input type="password" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <br />
            <button type="submit" className="btn btn-raised">Complete Registration</button>

        </form>


    )
    return (
        <div className="container p-5">

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Registration</h4>
                    {registerCompleteForm()}
                </div>
            </div>
        </div>
    )
}

export default RegisterComplete
