import { useEffect, useState } from 'react'
import logo from "./../../../assets/logo.png"
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';
import { CgCloseR } from "react-icons/cg";
// Assuming HText is not used, it has been removed
// import HText from '../HText'
type Props = {
    closeAuthModal: () => void;
}
const AuthenticationModal = ({closeAuthModal}: Props) => {
    
    const [toggleSignup, setToggleSignup] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>('');

    const openSignUpModal = () => {
        setToggleSignup(true);
    }

    const closeSignUpModal = () => {
        setToggleSignup(false);
    }

    useEffect(() => {
        setSuccessMessage('');
    }, [])


    return (
        <div className="fixed inset-0 z-30 overflow-y-auto flex items-center justify-center">
            <div className="min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">


                {/* Overlay */}
                <div className="fixed inset-0 bg-[#878787] bg-opacity-75 transition-opacity"></div>

                {/* Close Icon */}
                <div className="inline-block align-middle rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">

                    {/* Close Button */}
                    <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={closeAuthModal}>
                        <CgCloseR size={36} />
                    </button>

                    <div className='bg-white py-10 px-6'>
                        {/* Logo Section */}
                        <div className='mb-4'>
                            <img src={logo} alt="Logo" className='mx-auto' />
                        </div>

                        {/* Modal Panel */}
                        {toggleSignup ? (<SignUpModal closeSignUpModal={closeSignUpModal} setSuccessMessage={setSuccessMessage} />) : (<LoginModal successMessage={successMessage} openSignUpModal={openSignUpModal} setSuccessMessage={setSuccessMessage}/>)}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthenticationModal
