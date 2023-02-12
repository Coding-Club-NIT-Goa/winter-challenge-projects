import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
// import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '../store';
import Error from './Error';

library.add(faCheck);


function Auth() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setisSignUp] = useState(false);
  const [input, setinput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setinput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    try {
      const res = await axios
        .post(`http://localhost:5000/api/user/${type}`, {
          name: input.name,
          email: input.email,
          password: input.password,
        }).catch((err) => { console.log(err); setErrorMessage('Check Connections') })
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error)
      setErrorMessage('Incorrect Credentials');
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp)
      sendRequest("signup")
        .then((data) => {
          dispatch(loginAction.login(data))
        }).then(() => navigate("/"))
    else
      sendRequest().then((data) => {
        dispatch(loginAction.login(data));
      })
        .then(() => navigate("/"))

    setinput({
      name: "",
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setErrorMessage('');
    }, 5000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [errorMessage])
  return (
    <>
      {errorMessage && <Error error={errorMessage} />}
      <div className=" absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#" onSubmit={handleSubmit}>
            <div className='text-center'>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Chat App</h3>
            </div>
            {isSignUp && <div>
              <label for="name" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your name</label>
              <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Name" required="" value={input.name} onChange={handleChange} />
            </div>}
            <div>
              <label for="email" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your email</label>
              <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required="" value={input.email} onChange={handleChange} />
            </div>
            <div>
              <label for="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Your password</label>
              <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required="" value={input.password} onChange={handleChange} />
            </div>
            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{!isSignUp ? 'Login to your account' : 'Create account'}</button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              {isSignUp ? 'Already have an Account? ' : 'Not registered? '}<a href="#" className="text-blue-700 hover:underline dark:text-blue-500" onClick={() => setisSignUp(!isSignUp)}>{!isSignUp ? 'Create account' : 'Login'}</a>
            </div>
            {/* <div className="flex justify-between h-10 mt-5">
            <button className="py-2 text-sm font-bold text-white bg-blue-500 rounded-md px-14 hover:bg-opacity-90">
              <i className="fa fa-google mr-2"></i>
              <span className="ml-2 align-middle">Sign in with Google</span>
            </button>
          </div> */}
            {/* <GoogleLogin
					clientId="<--client id-->"
					render={renderProps => (
						<button className="py-2 text-sm font-bold text-white bg-blue-500 rounded-md px-14 hover:bg-opacity-90">
                            <i className="fa fa-google mr-2"></i>
                            <span className="ml-2 align-middle">Sign in with Google</span>
                        </button>
					)}
					buttonText="Login"
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					cookiePolicy={'single_host_origin'}
				/> */}
          </form>
        </div>
      </div>
    </>
  )
}

export default Auth