import React, { useState } from 'react'
import netflixlogo from "../src/netflix-logo.png"
import "../src/LoginScreen.css"
import SignInScreen from './SignInScreen';

const LoginScreen = () => {
  const [signIn,setSignIn]=useState(false);
  console.log(signIn)
  return <div className='loginScreen'>
      <div className='loginScreen__background'>
       <img src={netflixlogo} alt='' className='loginScreen__logo'/>
       <button className='loginScreen__button' onClick={()=>setSignIn(true)}>Sign In</button>
       <div className='loginScreen__gradient'/>
      </div>
      <div className='loginScreen__body'>
      {signIn?<SignInScreen/>:
        <>
        <h1>Unlimited films, TV programmes and more.</h1>
        <h2>Watch Anywhere. Cancel anytime</h2>
        <h3>Ready to watch? Enter your email to create or restart your membership</h3>
        <br></br>
        <div className='loginScreen__input'>
         <form>
          <input type='email' placeholder='Email Address'/>
          <button onClick={()=>setSignIn(true)} className='loginScreen__getStarted'>GET STARTED</button>
         </form>
        </div>
        </>}
      </div>
    </div>
  
}

export default LoginScreen