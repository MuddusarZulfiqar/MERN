import React,{useState} from 'react'
import BasePageTitle from "../../components/base/BasePageTitle";
import { useSelector } from 'react-redux';
import {Link, Navigate} from 'react-router-dom';
import {useAlert} from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {Login,getLoginUser} from '../../features/auth/UserSlice';

import { options } from '../../utils/tostOptions';
import { toast } from 'react-toastify';
function LoginView() {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);
    const history = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    if(user.isLogin) {
        return <Navigate to='/' replace />
    }
    const {email, password} = formData;
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const pageDetail = {
        background: "bg-parallax1.jpg",
        title: 'Login',
        breadCrumb:'Login'
      };
        const submitHandler = async (e) => {
            e.preventDefault();
            await dispatch(Login(formData));
            await dispatch(getLoginUser());
            
        }
    
  return (
    <>
        <BasePageTitle detail={pageDetail} />
        <div className='container'>
        <div className="title-section margin-bottom-55 mt-5"><h2 className="title">Login</h2></div>
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={changeHandler} placeholder="Enter email" required />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" name='password' className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={changeHandler}  required />
            </div>
            <button type="submit">Submit</button>
        </form>
        <div className='d-flex justify-content-between'>
        <p className='mt-4'>
            Do not have an account? <Link to='/register'>Register</Link>
        </p>
        <p className='mt-4'>
            <Link to='/forget-password'>Forget Password?</Link>
        </p>
        </div>
    </div>
    </>
    
  )
}

export default LoginView