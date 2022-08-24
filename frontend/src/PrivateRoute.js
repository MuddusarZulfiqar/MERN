
import {Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
export const PrivateRoute = ({children}) =>{
    const {user} = useSelector(state=>state.user);
    if(!user?.data?.name){
        return <Navigate to='/login' replace />
    }
    return children;
}
