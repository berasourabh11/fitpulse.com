import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  username: string;
};

const Profile: React.FC<Props> = ({ username }) => {
  const navigate = useNavigate(); 

  const handleProfileClick = () => {
    navigate('/profile'); 
  };
  
  return (
    <div className="relative group hover:underline" onClick={handleProfileClick}>
      <p>Your Profile</p>
      {/* Replace with your desired profile details layout */}
      <div className="absolute hidden group-hover:block p-4 bg-black shadow-lg text-white">
        <p>{username}</p>
        {/* Add more profile details here */}
      </div>
    </div>
  );
};

export default Profile;
