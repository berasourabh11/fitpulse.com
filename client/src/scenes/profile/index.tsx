import React, { useEffect } from 'react';
import { useAuthModal } from '../../shared/contexts/AuthModalContext';
import Logo from "../../assets/logo.png"
// Import icons, avatars, or other components as needed

const ProfilePage = () => {
    const { userDetails } = useAuthModal();

    useEffect(() => {
        // Fetching data or other side effects
    }, []);

    return (
        <div className='h-full w-full bg-light'>
            <div className='flex justify-between h-20 w-3/6 bg-accent mx-auto'>


                <div className='flex items-center w-1/2 ml-4'>
                    <h1 className='text-3xl text-dark'>Profile</h1>
                </div>
                <img src={Logo} alt="" />
            </div>

            <div className='w-4/6 flex'>
                {/* booked session Section */}
                <div>
                    
                </div>

                {userDetails ? (
                    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-5">
                        <div className="sm:flex sm:items-center px-6 py-4">
                            <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                                <p className="text-xl leading-tight text-dark">{userDetails?.firstname} {userDetails?.lastname}</p>
                                <p className="text-sm leading-tight text-secondary">{userDetails.email}</p>
                                <p className="mt-2 text-highlight">{userDetails.username}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-error">Error Loading Data for the moment.</p>
                )}
            </div>
        </div>



    );
};

export default ProfilePage;
