import React, { useState } from 'react';
import { signUp } from '../../api/authentication/auth';

type Props = {
  closeSignUpModal: () => void;
  setSuccessMessage: (value: string) => void;
};

const SignUpModal = ({ closeSignUpModal, setSuccessMessage }: Props) => {
  // State for input fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  // State for validation messages
  const [validationMessage, setValidationMessage] = useState('');

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(e.target.value);
  };

  // Validate inputs
  const validateInputs = () => {
    if (!firstName) {
      return 'First name can\'t be empty';
    }
    if (!lastName) {
      return 'Last name can\'t be empty';
    }
    if (!username) {
      return 'Username can\'t be empty';
    }
    if (password.length < 3 || password.length > 20) {
      return 'Password must be between 3 and 20 characters long';
    }
    return '';
  };

  // Handle form submission
  const handleSubmit = async () => {
    const message = validateInputs();
    if (message) {
      setValidationMessage(message);
    } else {
      // Proceed with form submission logic
      const response = await signUp(firstName, lastName, username, email, password);
      if (response?.statusCode === 200) {
        setSuccessMessage('Account created successfully. Please login to continue');
        closeSignUpModal();
      } else if (response?.statusCode === 409) {
        setValidationMessage(response.data.message);
      } else if (response?.statusCode === 400) {
        setValidationMessage(response.data[0].message);
      }//end
      else {
        setValidationMessage('Something went wrong. Please try again later');
      }
    }
  };

  return (
    <>
      {/* Logo Section */}
      <h1 className="text-3xl text-black mb-6">Sign Up for a New Account</h1>
      {/* Form Section */}
      <div className="space-y-4">
        <form onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}>

          <div className="flex space-x-4">
            <input type="text" placeholder='First Name' className='flex-1 border-2 border-gray-300 rounded-md p-2' value={firstName} onChange={(e) => handleInputChange(e, setFirstName)} />
            <input type="text" placeholder='Last Name' className='flex-1 border-2 border-gray-300 rounded-md p-2' value={lastName} onChange={(e) => handleInputChange(e, setLastName)} />
          </div>
          <input type="text" placeholder='Username' className='w-full border-2 border-gray-300 rounded-md p-2' value={username} onChange={(e) => handleInputChange(e, setUsername)} />
          <input type="email" placeholder='Email' className='w-full border-2 border-gray-300 rounded-md p-2' autoComplete='email' value={email} onChange={(e) => handleInputChange(e, setEmail)} />
          <input type="password" placeholder='Password' className='w-full border-2 border-gray-300 rounded-md p-2' autoComplete='password' value={password} onChange={(e) => handleInputChange(e, setPassword)} />
          <button type='submit' className='w-full bg-black text-white rounded-md p-2' >Sign Up</button>
        </form>
        {validationMessage && <p className="text-red-500 text-center">{validationMessage}</p>}
        {/* Login Link */}
        <p className="text-center mt-4 text-black">Already have an account? <span onClick={() => closeSignUpModal()} className="text-blue-600 hover:text-blue-800 hover:cursor-pointer">Login</span></p>
      </div>
    </>
  );
};

export default SignUpModal;