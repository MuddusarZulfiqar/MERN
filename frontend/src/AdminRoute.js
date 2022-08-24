
import {Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
export const AdminRoute = ({children}) =>{
    const {user} = useSelector(state=>state.user);
    if(!user?.data?.name){
        return <Navigate to='/login' replace />
    } else if(user?.data.role != 'admin'){
        return <Navigate to='/' replace />
    } else {
        return children;
    }
    
}
