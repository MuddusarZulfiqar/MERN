import React,{useState, useEffect } from 'react'
import BasePageTitle from "../../components/base/BasePageTitle";
import axios from '../../axiosConfig.js';
import { useSelector } from 'react-redux';
import {Link, Navigate} from 'react-router-dom';
import { options } from '../../utils/tostOptions';
import { toast } from 'react-toastify';
// Timer Function

const Timer = (props) => {
    const {initialMinute = 0,initialSeconds = 0} = props;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
            if(minutes === 0 && seconds === 0){
                const {setShowButton} = props;
                setShowButton(true)
            }
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <>
        { minutes === 0 && seconds === 0
            ? null
            : <p> You can send Email after {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</p> 
        }
        </>
    )
}





function ForgetPasswordView() {
    const user = useSelector(state=>state.user);
    const [shownButton,setShownButton] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
    });
    if(user.isLogin) {
        return <Navigate to='/' replace />
    }
    const {email} = formData;
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const pageDetail = {
        background: "bg-parallax1.jpg",
        title: 'Forget Password',
        breadCrumb:'Forget Password'
      };
        const submitHandler = async (e) => {
            e.preventDefault();
            setShownButton(false)
            if(!shownButton){
                return
            }
            await axios.post('/user/resetPassword',formData).then((res)=>{
                
                toast.success(res.data.message,options);
            }).catch((err)=>{
                toast.error(err.response.data.message,options);
            })
        }
    
  return (
    <>
        <BasePageTitle detail={pageDetail} />
        <div className='container'>
        <div className="title-section margin-bottom-55 mt-5"><h2 className="title">Forget Password</h2></div>
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={changeHandler} placeholder="Enter email" required />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            {
                shownButton ? <button type="submit">Submit</button> : <> <Timer initialMinute={1} setShowButton={setShownButton} /></>
            }
            
            
        </form>
        <div className='d-flex justify-content-between'>
            <p className='mt-4'>
                Remember Password? <Link to='/login'>Login</Link>
            </p>
        </div>
    </div>
    </>
    
  )
}

export default ForgetPasswordView