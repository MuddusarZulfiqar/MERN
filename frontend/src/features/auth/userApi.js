import axios from '../../axiosConfig';

// Login User
export function LoginUser(data) {
    const url =  `/user/login`;
    return axios.post(url,data);
}

// Set user
export function getLoginUserData() {
    const url =  `/user/login`;
    return axios.get(url);
}

// Register User

export function registerUser(data) {
    const url =  `/user`;
    return axios.post(url,data);
}

// Logout User
export function LogoutUser() {
    const url =  `/user/logout`;
    return axios.post(url);
}

// Reset Password

export function ResetPassword({token,formData}) {
    const url =  `/users/resetPassword/${token}`;
    return axios.post(url,formData);
}