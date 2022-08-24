import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLoginUserData,LoginUser,registerUser,LogoutUser,ResetPassword } from './userApi';
import { options } from '../../utils/tostOptions';
import { toast } from 'react-toastify';
import { Navigate } from "react-router-dom";
const initialState = {
    status:null,
    error:null,
    isLogin:null,
    user:{}
};


export const getLoginUser = createAsyncThunk(
    'user/getLogin',
    async (data) => {
      const response = await getLoginUserData(data);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
);

export const Login = createAsyncThunk(
    'user/login',
    async (data) => {
      const response = await LoginUser(data);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
);


export const Logout = createAsyncThunk(
    'user/logout',
    async () => {
        const response = await LogoutUser();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const Register = createAsyncThunk(
  'user/register',
  async (data) => {
    const response = await registerUser(data);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
  }
)

export const ResetPass = createAsyncThunk(
  'user/resetPassword',
  async (data) => {
    const response = await ResetPassword(data);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
  }
)


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(getLoginUser.pending, (state) => {
            state.status = 'loading';
          }).addCase(getLoginUser.rejected,(state,action)=>{
            state.status = 'idle';
            state.error = action.payload;
            state.isLogin = false;
          })
          .addCase(getLoginUser.fulfilled, (state, action) => {
            state.status = 'idle';
            state.user = action.payload;
            state.isLogin = true
          });

          // Login
          builder.addCase(Login.pending, (state) => {
            state.status = 'loading';
          }
          ).addCase(Login.rejected,(state,action)=>{
            state.status = 'idle';
            state.error = action.payload;
            toast.error('Something Went Wrong',options);
            state.isLogin = false
          }
          ).addCase(Login.fulfilled, (state, action) => {
            state.status = 'idle';
            state.isLogin = true;
            <Navigate to="/dashboard/profile" replace />
            toast.success('Login SuccessFully',options);
            
          }
          );
          // Register
          builder.addCase(Register.pending, (state) => {
            state.status = 'loading';
          }
          ).addCase(Register.rejected,(state,action)=>{
            state.status = 'idle';
            state.error = action.payload;
            toast.error('Something Went Wrong',options);
            state.isLogin = false
          }
          ).addCase(Register.fulfilled, (state, action) => {
            state.status = 'idle';
            state.isLogin = true;
            toast.success('Register / Login SuccessFully',options);
          }
          );
          // Logout
          builder.addCase(Logout.pending, (state) => {
            state.status = 'loading';
          }
          ).addCase(Logout.rejected,(state,action)=>{
            state.status = 'idle';
            state.error = action.payload;
            state.isLogin = false
            toast.error('Something Went Wrong',options);
          }
          ).addCase(Logout.fulfilled, (state, action) => {
            state.status = 'idle';
            state.isLogin = false;
            state.user = action.payload
            toast.success('Logout SuccessFully',options);
          }
          );
          // Reset Password
          builder.addCase(ResetPass.pending, (state) => {
            state.status = 'loading';
          }
          ).addCase(ResetPass.rejected,(state,action)=>{
            state.status = 'idle';
            state.error = action.payload;
            state.isLogin = false;
            toast.error('Something Went Wrong',options);
          }
          ).addCase(ResetPass.fulfilled, (state, action) => {
            state.status = 'idle';
            state.isLogin = false;
            toast.success('Password Is Reset !',options);
          }
          );
      },
});


export default userSlice.reducer;