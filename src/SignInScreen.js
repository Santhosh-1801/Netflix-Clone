import React from 'react'
import "../src/SignInScreen.css"
import { useRef } from 'react'
import {auth} from "./firebase"
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

const SignInScreen = () => {
  const emailRef=useRef(null);
  const passwordRef=useRef(null);
  const register=(e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value).then((authUser)=>{
      console.log(authUser.user)
    }).catch((error)=>{
   alert(error.message)
    })

  }
  const signIn=(e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth,emailRef.current.value,passwordRef.current.value).then((authUser)=>{
        console.log(authUser.user)
    }).catch((error)=>{
        alert(error.message)
    })
    
  }
  return (
    <div className='signinscreen'>
    <div className='signinscreenforms'>
    <form style={{display:'flex',flexDirection:"column"}}>
        <h1 style={{marginRight:"170px"}}>Sign In</h1>
        <input ref={emailRef} type='email' placeholder='Email' style={{width:"250px",left:"0px"}}/>
        <input ref={passwordRef} type='password' placeholder='Password' style={{width:"250px" ,left:"0px"}}/>
        <button className='submit' onClick={signIn}>Sign In</button>
        <h4><span className='loginScreen__gray'>New to Netflix? </span><span className='loginScreen__link' onClick={register}>Sign Up Now</span></h4>
    </form>
    </div>
    </div>
  )
}

export default SignInScreen