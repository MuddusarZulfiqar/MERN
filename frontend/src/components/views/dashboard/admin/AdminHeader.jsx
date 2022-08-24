import React from 'react'
import useAvatar from '../../../../hooks/useAvatar'
function UserHeader({user}) {
    const {name} = user;
    const image = useAvatar(name)
  return (
    <div className='header-dashboard text-center'>
        <div className='avatar '>
            <img src={image} alt="profile Icon"  />
        </div>
        <h3 className='mt-3'>Hello {name}</h3>
    </div>
  )
}

export default UserHeader