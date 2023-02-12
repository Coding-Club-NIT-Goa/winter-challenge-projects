import './App.css';
import React from 'react';
import Auth from './components/Auth';
import {Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home';
import { useState, useEffect } from 'react';
// import GoogleLogin from 'react-google-login';
import { useSelector } from 'react-redux';


function App() {
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);
  // const isLoggedIn = false;
  return (
    <React.Fragment >
      <Routes>
        <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to='/login' />} />
        <Route path='/login' element={isLoggedIn   ? <Navigate to='/' /> : <Auth />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
