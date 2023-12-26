import './index.css';
import React from 'react';
import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthTokenService from '../services/AuthTokenService';

const HomePage = () => {
  const [UserEmail, setUserEmail] = useState('');
  const [PassWord, setPassWord] = useState('');

  let navigate = useNavigate();

  // check the input that the user input information via check submit button
  const checkSubmiteButton = async () => {
    try {
      const getAuth = await AuthTokenService.AuthToken(PassWord);
      navigate(`/${getAuth.jwt}/NewStockPage/`);
    } catch (error) {
      console.error('Error fetching authentication data:', error);
    }
  };

  // listen to the enter button was enter
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      checkSubmiteButton();
    }
  };

  // check the forgot password button and link to a new forget password page
  const checkForgotPasswordButton = () => {
    navigate('/ForgotPassWordPage');
  };

  return (
    <div className="grid h-screen place-content-center">
      <div className=" text-3xl font-bold text-blue-600  ml-20 pb-8">
        <h1> Login Page</h1>
      </div>

      <div className="mb-8">
        <input
          className=" h-16 w-80 border-solid border-2 border-black "
          placeholder="Email"
          onChange={(event) => setUserEmail(event.target.value)}
        />
      </div>

      <div className="mb-8">
        <input
          className=" h-16 w-80 border-solid border-2 border-black"
          placeholder="Password"
          onChange={(event) => setPassWord(event.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>

      <div className="flex w-max gap-4 ">
        <Button variant="filled" color="green" onClick={checkSubmiteButton}>
          {' '}
          Submit
        </Button>
        <Button
          variant="text"
          className="ml-16 text-blue-600"
          color="white"
          onClick={checkForgotPasswordButton}
        >
          Forgot Password
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
