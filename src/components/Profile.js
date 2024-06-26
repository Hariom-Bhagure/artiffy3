import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Image } from 'react-bootstrap';
import "./Profile.css";

const Profile = () => {
    const {isAuthenticated,user} = useAuth0();

  return (
    <div className='profile'>User Profile

        {
           isAuthenticated && <Image src = {user.name}    width={70} height={70} />
        }
        

    </div>
  )
}

export default Profile