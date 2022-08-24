import React,{useState} from 'react'
import BasePageTitle from "../../components/base/BasePageTitle";
import { useSelector,useDispatch } from 'react-redux';
import {Link, Navigate} from 'react-router-dom';
import {Register,getLoginUser} from '../../features/auth/UserSlice.js';
import { options } from '../../utils/tostOptions';
import { toast } from 'react-toastify';
function RegisterView() {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    if(user.isLogin) {
        return <Navigate to='/dashboard/profile' replace />
    }
    const { name, email, password, confirmPassword } = formData;
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const pageDetail = {
        background: "bg-parallax1.jpg",
        title: 'Register',
        breadCrumb:'Register'
      };
      // form validation
        const validate = () => {
            if (password !== confirmPassword) {
                toast.error('Passwords do not match',options);
                return false;
            } else if(password.length < 6) {
                toast.error('Password must be at least 6 characters',options);
                return false;
            } else {
                return true;
            }
        }
        const submitHandler = async (e) => {
            e.preventDefault();
            if (validate()) {
                await dispatch(Register(formData))
                await dispatch(getLoginUser());
            }
        }
    
  return (
    <>
        <BasePageTitle detail={pageDetail} />
        <div className='container'>
        <div className="title-section margin-bottom-55 mt-5"><h2 className="title">Register</h2></div>
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="userName">Name</label>
                <input type="text" className="form-control" name='name' id="userName" placeholder="Enter name" value={name} onChange={changeHandler} required />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={changeHandler} placeholder="Enter email" required />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" name='password' className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={changeHandler}  required />
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name='confirmPassword' className="form-control" id="confirmPassword" placeholder="Password" value={confirmPassword} onChange={changeHandler} required />
            </div>
            <button type="submit">Submit</button>
        </form>
        <p className='mt-4'>
            Already have account? <Link to='/login'>Login</Link>
        </p>
    </div>
    </>
    
  )
}

export default RegisterView