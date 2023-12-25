import React, { useState } from 'react';
import logo from "./../../../assets/logo.png";
import { login } from '../../api/authentication/auth';
import { CgCloseR } from "react-icons/cg";

type Props = {
    successMessage: string;
    openSignUpModal: () => void;
}

const LoginModal = ({ successMessage, openSignUpModal }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationMessage, setValidationMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
        setter(e.target.value);
    };

    const validateInputs = () => {
        if (!email) {
            return 'Email can\'t be empty';
        }
        if (!password) {
            return 'Password can\'t be empty';
        }
        return '';
    };

    const handleSubmit = async () => {
        const message = validateInputs();
        if (message) {
            setValidationMessage(message);
        } else {
            // Proceed with form submission logic
            const response = await login(email, password);
            console.log(response);
        }
    };


    const buttonStyle = (email !== '' && password !== '') ? 'w-full bg-black text-white rounded-md p-2' : 'w-full bg-gray-300 text-white rounded-md p-2 cursor-not-allowed';
    return (

        <>
            <h1 className="text-3xl text-black mb-6">Login to unlock all features</h1>
            {/* Form Section */}

            {/* Success Message */}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

            <div className="space-y-4">
                <form onSubmit={(e)=>{e.preventDefault();
                     handleSubmit()}}>
                    <input type="text" placeholder='Email' className='w-full border-2 border-gray-300 rounded-md p-2' autoComplete="username" value={email} onChange={(e) => handleInputChange(e, setEmail)} />
                    <input type="password" placeholder='Password' className='w-full border-2 border-gray-300 rounded-md p-2' autoComplete="current-password" value={password} onChange={(e) => handleInputChange(e, setPassword)} />
                    <button type="submit" className={buttonStyle} >Login</button>
                </form>
                {/* Signup Link */}
                {validationMessage && <p className="text-red-500 text-center">{validationMessage}</p>}
                <p className="text-center mt-4 text-black">Don't have an account? <span onClick={openSignUpModal} className="text-blue-600 hover:text-blue-800 hover:cursor-pointer">Sign up</span></p>
            </div>
        </>
    );
};

export default LoginModal;
