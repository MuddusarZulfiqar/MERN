import React from 'react'
import Dashboard from "../Dashboard";
import axios from "../../../../axiosConfig";
import {useAlert} from 'react-alert';
function ChangePassword() {
    const alert = useAlert();
 const [formData, setFormData] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
    });
    const { oldPassword, newPassword, confirmPassword } = formData;
    const changeEvent = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const changePassword = e => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert.error("Passwords do not match");
            return;
        } else if(newPassword.length < 6){
            alert.error("Password must be at least 6 characters");
            return;
        }
        axios.post('user/changePassword',formData).then((res)=>{
            alert.info('Password changed')
        }).catch((err)=>{
            alert.error(err.response.data.message)
        }).finally(()=>{
            setFormData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            })
        })
    }
  return (
    <Dashboard>
        <form onSubmit={changePassword}>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Old Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Old Password" value={oldPassword} name="oldPassword" onChange={changeEvent} required />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">New Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="New Password" value={newPassword} name="newPassword" onChange={changeEvent} required />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Confirm Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Confirm Password" value={confirmPassword} name="confirmPassword" onChange={changeEvent} required />
            </div>
            <button type="submit">Submit</button>

        </form>
    </Dashboard>
  )
}

export default ChangePassword