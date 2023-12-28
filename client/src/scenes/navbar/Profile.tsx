type props = {
        username: string,
}

const Profile = ({ username }: props) => {
    return (
      <div className="relative group hover:underline">
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