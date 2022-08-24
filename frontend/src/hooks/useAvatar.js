// create image avatar base on name
import {useState,useEffect} from 'react';
const useAvatar =  (name) => {
    // remove space in name
    const [avatarUrl, setAvatarUrl] = useState(null);
    const nameWithoutSpace = name.replace(/\s/g, '+');
    useEffect(()=>{
         setAvatarUrl(`https://ui-avatars.com/api/?name=${nameWithoutSpace}`);
        return ()=>{
            setAvatarUrl(null);
        }
    },[avatarUrl])
    // setAvatarUrl(`https://www.gravatar.com/avatar/${nameWithoutSpace}?d=identicon`)
    return avatarUrl;
}
export default useAvatar;