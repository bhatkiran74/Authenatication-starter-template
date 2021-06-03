import React, { useState } from 'react'
import { toast } from 'react-toastify';
import UserNav from '../../components/nav/UserNav'
import { auth } from '../../firebase';
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'



const Password = () => {

    const { user } = useSelector((state) => ({ ...state }))

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const history = useHistory();


    // const roleBasedRedirect = (res) => {
    //     if (res.data.role === 'admin') {
    //         history.push("/admin/dashboard")
    //     }
    //     else {
    //         history.push("/user/dashboard");
    //     }


    // }






    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        //reset password
        await auth.currentUser.updatePassword(password).then((res) => {

            setLoading(false);
            toast.success("Succefully changed password")

            setPassword("")

            if (user.role === 'admin') {
                history.push("/admin/dashboard")
            }
            else {
                history.push("/user/dashboard");
            }


        }).catch((err) => {

            setLoading(false);
            toast.error(err.message)
        })




    }

    const passwordUpdateForm = () => <form onSubmit={handleSubmit}>

        <div className="from-group">
            <label >Your Password</label>
            <input type="password" className="form-control" placeholder="Enter New Password" onChange={(e) => { setPassword(e.target.value) }} disabled={loading} value={password} />

            <button className="btn btn-primary my-3" disabled={!password || password.length < 6 || loading}>Change Password</button>
        </div>
    </form>



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>

                <div className="col-md-4 py-3">
                    {loading ? (<h4 className="text-danger">Loading</h4>) : (<h4>Reset Password</h4>)}

                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    )
}

export default Password
