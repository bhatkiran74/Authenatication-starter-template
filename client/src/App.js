
import { Switch, Route } from 'react-router-dom'
import Header from './components/nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import RegisterComplete from './pages/auth/RegisterComplete';
import { auth } from './firebase';
import { useDispatch } from 'react-redux'
import { useEffect } from 'react';
import ForgotPassword from './pages/auth/ForgotPassword';
import { currentUser } from './function/auth'
import History from './pages/user/History';


//privateroute
import UserRoute from './components/routes/UserRoute'
import Password from './pages/user/Password';
import Wishlist from './pages/user/Wishlist';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';




const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    const unSubScribe = auth.onAuthStateChanged(async (user) => {

      if (user) {

        const idTokenResult = await user.getIdTokenResult();


        currentUser(idTokenResult.token).then((res) => {
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

        }).catch((err) => {
          console.log(err);
        })


      }



    })




    return () => unSubScribe()
  }, [dispatch])




  return (
    <>

      <Header />
      <ToastContainer />
      <Switch >


        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />

        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />

        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />

      </Switch>

    </>
  );
}

export default App;
