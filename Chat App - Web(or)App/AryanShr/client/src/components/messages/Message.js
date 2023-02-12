import React, { useState, useEffect } from 'react'
import CryptoJS from 'crypto-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { useSelector } from 'react-redux';
import Error from '../Error';
function Message(props) {
  const {user, token} = useSelector(state => state.login)
  let style = props.sender ? 'w-fit ml-auto flex flex-col max-w-[40%]' : 'max-w-[40%] w-fit flex flex-col';
  const bytes = CryptoJS.AES.decrypt(props.message, '109Aryan109');
  const decryptdMessage = bytes.toString(CryptoJS.enc.Utf8)
  const initial_time = Math.floor((new Date() - new Date(props.time)) / (1000 * 60))
  const [time, setTime] = useState();
  const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setErrorMessage('');
        }, 5000);
        return () => {
          clearTimeout(timeoutId);
        };
      }, [errorMessage])
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Math.floor((new Date() - new Date(props.time)) / (1000 * 60)));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  let timeMessage;
  if (isNaN(time) || time <= 0) {
    timeMessage = `few seconds ago`;
  } else if (time >= 1 && time <= 3) {
    timeMessage = `few minutes ago`
  } else if (time < 60) {
    timeMessage = `${time} minutes ago`
  } else if (time < 24 * 59) {
    timeMessage = `${Math.floor(time / 60)} hours ago`
  } else {
    timeMessage = `${Math.floor(time / (60 * 24))+1} days ago`
  }

  const [deletemess,setDeletemess] = useState(false)
  const deleteMessage = ()=>{
    props.deleteroutine(props.id);
  }
  return (
    <div className='m-4'>
    
      {errorMessage && <Error error={errorMessage} />}
      <div className={style} >
        <p className='bg-[#7544FF] p-2 rounded-lg break break-all' onMouseEnter={()=>setDeletemess(true)} onMouseLeave={()=>setDeletemess(false)}>
        {deletemess&& user._id===props.senderId && <div className='text-end ml-auto'>
          <FontAwesomeIcon icon={faTimes} className='cursor-pointer inline-block' onClick={deleteMessage}/>
        </div>}
        {decryptdMessage}
        </p>
        <p className='text-end text-[#7544FF] text-[12px]'>{timeMessage}</p>
      </div>
    </div>
  )
}

export default Message