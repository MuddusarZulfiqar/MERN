
import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/userProfile.css';
import { useNavigate } from 'react-router-dom';
import {Logout,getLoginUser} from '../../../../features/auth/UserSlice';
import {useDispatch,useSelector} from 'react-redux';
function UserNavigation() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);
    const LogoutUser= async ()=>{
        
        await dispatch(Logout())
        await dispatch(getLoginUser());
        if(user.isLogin){
            return
        } else {
            navigate('/')
        }
        
    }
  return (
    <nav className='userProfile-nav'>
        <ul>
            <li>
                <NavLink to="/dashboard/profile" >
                    Profile
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/orders" >
                    Orders
                </NavLink>
            </li>
            
            <li>
                <NavLink to="/dashboard/change-password" >
                    Change Password
                </NavLink>
            </li>
            <li>
                <button onClick={()=>LogoutUser()}>Logout</button>
            </li>
        </ul>
    </nav>
  )
}

export default UserNavigation