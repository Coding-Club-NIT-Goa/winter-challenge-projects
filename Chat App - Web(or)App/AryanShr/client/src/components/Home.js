import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../store';
import plus from './img/plus-icon.svg'
import logOut from './img/logOut.svg'
import Contact from './chat/contact';
import Conversation from './conversation/Conversation';
import Error from './Error';
import { io } from 'socket.io-client';
function Home() {
  const dispatch = useDispatch();
  const {user, token} = useSelector(state => state.login)
  const [convo, setConvo] = useState([]);
  const [add, setadd] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fetchUserConvos = async()=>{
    try{
      const res = await fetch(`http://localhost:5000/api/conversation/find/${user._id}`,{

        headers:{
          'Authorization': `Bearer ${token}`
        }

      })
      // console.log(convo)
      const convos = await res.json()
      setConvo((prev)=> convos)
    }catch(err){
      console.error(err)
      setErrorMessage('Unable to fetch conversation');
    }
  } 
  useEffect(()=>{
    fetchUserConvos()
    // convo.sort((a,b)=>{return new Date(b.updatedAt)-new Date(a.updatedAt)})
    // console.log(convo)
  },[convo])


  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const AddConversation = async(event)=>{
    event.preventDefault();
    try{
      const res = await axios.get(`http://localhost:5000/api/user/email/${formData.email}`)
      // console.log(res.data);
      const req = await axios.post(`http://localhost:5000/api/conversation/`,{
        receiverId: res.data.id
      },{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })
      fetchUserConvos()
      setadd(false)
    } catch(err){
      console.error(err)
      setErrorMessage('Unable to find the User');
    }
  }

  //Clicked conversation

  const [clickedConvo, setClickedConvo] = useState(null)

  useEffect(()=>{
    const timeoutId = setTimeout(() => {
      setErrorMessage('');
    }, 5000);
    return () => {
      clearTimeout(timeoutId);
    };
  },[errorMessage])
  return (
    <div>
    {errorMessage && <Error error={errorMessage} />}
      <div className={`relative w-11/12 h-4/5 bg-[#292234] mx-auto mt-8`}>
        {add ? <div className='absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center'>
          <div className='absolute p-4 h-48 w-[30rem]  bg-[#47119e] rounded-lg z-50'>
            <div className='text-end'>
              <button onClick={() => setadd(false)}>X</button>
            </div>
            <form onSubmit={AddConversation}>
              <div className='flex-auto flex-col items-center text-center space-y-4'>
                <div className='text-purple-400'>
                  Enter the User Name
                </div>
                <div>
                  <input name='email' type='email' onChange={handleInputChange} placeholder='Email...' className='w-[80%] rounded-2xl p-2 bg-[#7544FF] border-2 border-purple-400 active:border-purple-400 outline-none'/>
                </div>
                <div>
                  <button type='submit' className="bg-purple-600 hover:bg-purple-500 text-black text-xl px-2 py-1 rounded-full">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div> : <div></div>}
        <div className='flex gap-1 h-[45rem]' style={add?{opacity:0.5, pointerEvents:'none'}:{opacity:1}}>
          <div className='flex-initial w-[30rem] '>
            <div className='flex flex-col space-y-2 '>
              <div className='bg-[#5a24f5] h-16 flex flex-row '>
                <div className='bg-white rounded-full h-14 w-14 mt-1 ml-1'>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt='icon' className='mx-auto my-auto rounded-full h-14 w-14'/>
                </div>
                <div className='m-4'>
                  {user.name}
                </div>
                <div className='ml-auto flex'>
                  <button onClick={() => setadd(!add)} className=''>
                    <img src={plus} alt='plus' width={'25%'} className='ml-auto' />
                  </button>
                  <button onClick={() => dispatch(loginAction.logout())}>
                    <img src={logOut} alt="logout" width={'100%'} className='mr-auto' />
                  </button>
                </div>
              </div>
              <div className='bg-[#372272] relative h-[40.5rem] '>
                <div className='mt-8 '>
                  <div className='flex flex-col space-y-1'>
                  {convo?.map((c,index)=>(
                    <div className='flex bg-[#5A24F5] active:bg-[#431DAE] hover:bg-[#431DAE]' onClick={()=>{
                      setClickedConvo(c); 
                      // console.log(clickedConvo);                      
                      }}>
                      <Contact key={index} icon="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" id={c._id} token={token} user_id ={c.members.find((e)=> {return e._id!== user._id})}
                      />
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex-auto '>
            <Conversation converse ={clickedConvo} icon="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home