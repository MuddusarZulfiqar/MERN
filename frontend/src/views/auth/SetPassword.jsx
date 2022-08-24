import React,{useState} from 'react'
import BasePageTitle from "../../components/base/BasePageTitle";
import axios from '../../axiosConfig.js';
import { useSelector } from 'react-redux';
import {Navigate} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {getLoginUser} from '../../features/auth/UserSlice';
import {useParams} from 'react-router-dom';

import { options } from '../../utils/tostOptions';
import { toast } from 'react-toastify';
function SetPasswordView() {
    const { token } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);
    const history = useNavigate();
    const [formData, setFormData] = useState({
        confirmPassword: '',
        password: '',
    });
    if(user.isLogin) {
        return <Navigate to='/' replace />
    }
    const {confirmPassword, password} = formData;
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const pageDetail = {
        background: "bg-parallax1.jpg",
        title: 'Create Password',
        breadCrumb:'Create Password'
      };
        const submitHandler = async (e) => {
            e.preventDefault();
            // user forget Password
            const url =  `/users/resetPassword/${token}`;
            await axios.post(url,formData).then(async(res)=>{
                
                toast.success('Successfully Login !',options)
                
            }).catch((err)=>{
                console.log(err);
                toast.error(err.response.data.message,options);
            }).finally(async ()=>{
                await dispatch(getLoginUser());
            })
            
            
        }
    
  return (
    <>
        <BasePageTitle detail={pageDetail} />
        <div className='container'>
        <div className="title-section margin-bottom-55 mt-5"><h2 className="title">Create Password</h2></div>
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" name='password' className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={changeHandler}  required />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword2">Confirm Password</label>
                <input type="password" name='confirmPassword' className="form-control" id="exampleInputPassword2" placeholder="Password" value={confirmPassword} onChange={changeHandler}  required />
            </div>
            <button type="submit">Submit</button>
        </form>
        <div className='d-flex justify-content-between'>
        
        
        </div>
    </div>
    </>
    
  )
}

export default SetPasswordView