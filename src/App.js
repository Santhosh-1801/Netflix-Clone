import React from 'react';
import './App.css';
import HomeScreen from './HomeScreen';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './ProfileScreen';

function App() {
  const user=useSelector(selectUser)
  const dispatch=useDispatch();
  useEffect(()=>{
  const changeSubscribe=auth.onAuthStateChanged((userAuth)=>{
    if(userAuth){
     console.log(userAuth)
     dispatch(login({
      uid:userAuth.uid,
      email:userAuth.email,
     }))
    }
    else{
       dispatch(logout());
    }
    return changeSubscribe
  })
  },[dispatch])
  return (
    <div className="app">
     <BrowserRouter>
     {!user?(<LoginScreen/>):(
      <Routes>
      <Route path="/profile" element={<ProfileScreen/>}/>
      <Route path="/" element={<HomeScreen/>} exact>
      </Route>
    </Routes>
     )}
    </BrowserRouter>
    </div>
  );
}

export default App;
