import React, { useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useSelector } from 'react-redux'
import CryptoJS from 'crypto-js';
import Error from '../Error'
function Contact(props) {
    const {user, token} = useSelector(state => state.login)

    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setErrorMessage('');
        }, 5000);
        return () => {
          clearTimeout(timeoutId);
        };
      }, [errorMessage])
    const selectConvo = (arr) => {
        let curr = arr.find((e) => { return e._id !== user._id })
        return curr;
    }
    const deleteConvo = async()=>{
        try {
            const res = await axios.delete(`http://localhost:5000/api/conversation/${props.id}`,{
               headers:{
                    'Authorization': `Bearer ${props.token}`
                  }
        
            })
        } catch (error) {
            console.log(error)
        }
    }
    const [latestmessage,setlatestMessage] = useState('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getLatestMessage = async (_id) => {
      try {
          const res = await axios.get(`http://localhost:5000/api/message/${_id}`, {
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
          const fetchmessaged = await res.data.existingConvo;
        if(fetchmessaged.length>0){
            if(fetchmessaged[0]){
                const bytes = CryptoJS.AES.decrypt(fetchmessaged.sort((a,b)=>{return new Date(b.createdAt)-new Date(a.createdAt)})[0].messageText, '109Aryan109');
                const decryptdMessage = bytes.toString(CryptoJS.enc.Utf8)
                setlatestMessage(decryptdMessage);
            }
        }else{
            setlatestMessage(' ');
        }
      } catch (error) {
          console.log(error)
      }
  }
  useEffect(()=>{
        getLatestMessage(props.id);
    },[getLatestMessage, props.id])
    return (
        <>
            {errorMessage && <Error error={errorMessage} />}
            <div className='bg-white rounded-full h-14 w-14 my-3 ml-1 flex-none'>
                <img src={props.icon} alt='icon' className='mx-auto my-auto rounded-full h-14 w-14'/>
            </div>
            <div className='m-4 flex flex-col max-w-[80%] h-fit'>
                <div className='flex grow w-96'>
                    <div>
                        {props.user_id.name}
                    </div>
                    <div className='text-end ml-auto'>
                        <FontAwesomeIcon icon={faTrash} className='cursor-pointer inline-block' onClick={deleteConvo}/>
                    </div>
                </div>
                <div className='truncate'>
                    {latestmessage}
                </div>
            </div>
        </>
    )
}

export default Contact