import './index.css';
import React from 'react';
import { Button } from '@material-tailwind/react';
import { useState } from 'react';

function ForgotPassWordPage() {
  const [UserEmail, setUserEmail] = useState('');

  // check the input that the user input information via check submit button
  const checkSubmiteButton = () => {
    //     if (UserName === "theTuongVu" && PassWord === "testingStuff") {
    //      console.log("it is correct");
    //    } else{
    //      console.log("it false");
    //   }
  };
  return (
    // <div className= "grid h-screen place-content-center">
    //   <div className= " text-3xl font-bold text-blue-600 pb-8">
    //     <h1> Retrieve User information</h1>
    //   </div>

    //   <div className="mb-8">
    //    <input className=" h-16 w-80 border-solid border-2 border-black " placeholder = "Email" onChange={(event) => setUserEmail(event.target.value)}/>
    //   </div>

    // <div className="flex w-max gap-4 ">
    //   <Button variant="filled"  color ="green" onClick={checkSubmiteButton}> Submit</Button>
    // </div>
    // </div>
    <>
      <div>Work on Progess...</div>
    </>
  );
}

export default ForgotPassWordPage;
