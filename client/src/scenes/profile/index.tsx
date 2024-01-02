import { useEffect, useState } from 'react';
import { useAuthModal } from '../../shared/contexts/AuthModalContext';
import Logo from "../../assets/logo.png"
import profile from "../../assets/profile.jpg"
import { getUserBookedSessions } from '../../shared/api/apiCalls';
import { BookedActivity } from '../../shared/types';
import { logout } from '../../shared/api/authentication/auth';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
// Import icons, avatars, or other components as needed

const ProfilePage = () => {
    const { userDetails } = useAuthModal();
    const [activeButton, setActiveButton] = useState<string>('Upcoming')
    const [bookedSessions, setBookedSessions] = useState<BookedActivity[] | null >(null);
    const navigate=useNavigate();
    useEffect(() => {
        fetchSessions();
    }, [activeButton]);

    const fetchSessions = async () => {
        setBookedSessions(null);
        let response;
        if(activeButton==='All'){
            response=await getUserBookedSessions({all:true});
        }else{
            response=await getUserBookedSessions();
        }
        if(response.statusCode===200){
            setBookedSessions(response.data);
        }else{
            setBookedSessions([]);
        }

    }


    const handleButtonClick = async (buttonName: string) => {
        setActiveButton(buttonName);
    };

    const handleLogout = async () => {
        try{
            const response=await logout();
            if(response.statusCode===200){
                Swal.fire({
                    title: 'Success!',
                    text: 'Session Booked Successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/');
                        window.location.reload();
                    }
                });
            }            
        }catch(e){
            console.log(e);
        }
    }

    return (
        <div className='h-full w-full bg-light items-center justify-between'>
            <div className='flex justify-between h-20 w-3/6 bg-accent mx-auto'>
                <div className='flex items-center w-1/2 ml-4'>
                    <h1 className='text-3xl text-dark'>Profile</h1>
                </div>
                <img src={Logo} alt="" onClick={
                    ()=>{
                        navigate('/');
                    }
                }
                className='cursor-pointer'
                />
            </div>

            <div className='w-full flex items-center'>
                <div className='w-3/5 mx-auto'>
                    {userDetails ? (
                        <div className="shadow-lg rounded-lg overflow-hidden p-5">
                            <div className="sm:flex sm:items-center px-6 py-4">
                                {/* Each child div now has a defined width of 1/3 of the parent */}
                                <div className="w-1/3 mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                                    <p className="text-5xl mt-2 text-highlight text-black py-4">{userDetails.username}</p>
                                </div>
                                <div className="w-1/3">
                                    <img src={profile} alt="profile pic" />
                                </div>
                                <div className="w-1/3 mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                                    <p className="text-3xl leading-tight text-dark p-3">{userDetails?.firstname} {userDetails?.lastname}</p>
                                    <p className="text-xl leading-tight text-secondary p-3">{userDetails.email}</p>
                                </div>
                            </div>
                            <div className='w-full flex justify-end'>
                            <button 
                                    className='px-4 py-2 mt-4 mr-0 bg-red-500 text-white rounded hover:bg-red-600 transition-colors'
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-error">Error Loading Data for the moment.</p>
                    )}
                </div>
            </div>

            {/* booked session Section */}
            <div className='flex flex-col items-center justify-between py-5'>
                <h1 className="text-4xl text-black mb-6">Booked Sessions</h1>
                <div>
                    <button
                        className={`px-4 py-2 text-xl rounded-full transition-colors duration-300 ease-in-out ${activeButton === 'All' ? 'bg-yellow-500' : 'bg-white border border-gray-300 hover:bg-gray-100'} shadow-md`}
                        onClick={() => handleButtonClick('All')}
                    >
                        All
                    </button>
                    <button
                        className={`px-4 py-2 text-xl rounded-full ml-4 transition-colors duration-300 ease-in-out ${activeButton === 'Upcoming' ? 'bg-yellow-500' : 'bg-white border border-gray-300 hover:bg-gray-100'} shadow-md`}
                        onClick={() => handleButtonClick('Upcoming')}
                    >
                        Upcoming
                    </button>
                </div>

                <div className="w-3/5 mx-auto mt-4">
                    {bookedSessions && bookedSessions.map(session => (
                        <div key={session._id} className="border-b border-gray-300 py-2">
                            <h2 className="text-xl font-semibold">{session.activityName}</h2>
                            <p>Date: {session.activityDate} at {session.activityTime}</p>
                            <p>Day: {session.activityDay}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>



    );
};

export default ProfilePage;
