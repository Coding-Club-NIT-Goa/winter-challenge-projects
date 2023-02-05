import React, { useEffect } from 'react'
import grinFace from '../img/grinningFace.svg'
import send from '../img/send.svg'
import Message from '../messages/Message'
import ScrollToBottom from 'react-scroll-to-bottom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import io from 'socket.io-client';
import Error from '../Error';
function Conversation(props) {
    const { user, token } = useSelector(state => state.login)
    const [message, setMessage] = useState('');
    const [socket] = useState(() => io('http://localhost:5000'));
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

    const postMessage = async (e) => {
        if (e.type === 'click' || e.key === 'Enter') {
            let messagedata;
            try {
                const req = await axios.post(`http://localhost:5000/api/message`, {
                    conversationId: props.converse._id,
                    messagetxt: message
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                messagedata = req.data.message;
            } catch (error) {
                console.log(error)
                setErrorMessage('Unable to send Message')
            }
            socket.emit('send message', messagedata)
            setMessage('')
        }
    }

    const handleInputChange = (event) => {
        setMessage(event.target.value)
    }

    const [messaged, setMessaged] = useState([]);
    const getMessage = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/message/${props.converse._id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const fetchmessaged = await res.data.existingConvo;
            setMessaged(fetchmessaged)
        } catch (error) {
            console.log(error)
            // setErrorMessage('Unable to get Message')
        }
    }
    useEffect(() => {
        getMessage();
        props.converse && socket.emit('joinRoom', props.converse._id.toString());
    }, [props.converse])



    //Creating Socket
    useEffect(() => {
        const listener = (message) => {
            if(props.converse._id===message.conversationId)
                setMessaged((prev) => [...prev, message])
        }
        socket.on('new message', listener);
        const update = (messages)=>{
            setMessaged(messages);
        }
        socket.on('updated arr',update);
        return () => {
            socket.off('new message', listener);
            socket.off('updated message', update);
        }
    }, [socket,props.converse])

    //delete message
    const deleteMessage = async(messid)=>{
        try {
          const res = await axios.delete(`http://localhost:5000/api/message/${messid}`,{
             headers:{
                  'Authorization': `Bearer ${token}`
                }
      
          })
          const updatedmessaged = messaged.filter(mess=>mess._id!==messid);
          socket.emit('deleteMessage',updatedmessaged)
      } catch (error) {
          console.log(error)
      }
      }
      
    return (
        <div className='flex flex-col'> 
            {errorMessage && <Error error={errorMessage} />}
            <div className='h-16 bg-[#5a24f5] flex'>
                <div className='bg-white rounded-full h-14 w-14 my-1 ml-1'>
                    <img src={props.icon} alt='icon' className='mx-auto my-auto rounded-full h-14 w-14' />
                </div>
                {props.converse && <div className='m-4'>
                    {selectConvo(props.converse.members).name}
                </div>}
            </div>

            {props.converse ?
                <div>
                            {messaged.length>0?
                        <div className='relative h-[38rem]  p-4 flex flex-col-reverse'>
                            <div className='flex flex-col overflow-auto'>
                            <ScrollToBottom className='w-[100%] h-[100%]'>
                                {messaged?.map((m) => (
                                    <Message senderId = {m.senderId} id={m._id} time= {m.updatedAt} message={m.messageText} sender={m.senderId === user._id} deleteroutine = {deleteMessage} />
                                ))
                                }
                            </ScrollToBottom>
                            </div>
                        </div>:
                        <div className='relative h-[38rem]  p-4 flex flex-col'>
                            <div className='flex flex-col overflow-auto'>
                            <div className='my-10 mx-auto text-[#5a24f5] font-semibold text-5xl'>Be the first to message</div>
                            </div>
                        </div>
                            }
                    <div className=' flex h-[3rem]  bg-[#5a24f5]'>
                        {/* <div className='flex-initial w-14 m-2'>
                            <button>
                                <img src={grinFace} alt='grinning emoji' width={'75%'} className="" />
                            </button>
                        </div> */}
                        <div className='flex-auto w-[100%]'>
                            <input onKeyDown={postMessage} value={message} onChange={handleInputChange} type="text" className='w-[100%] m-2 rounded-lg bg-[#7544FF] p-1' placeholder='Type Your Message'></input>
                        </div>
                        <div className='flex pl-4'>
                            <button onClick={postMessage}>
                                <img src={send} alt='send' width={'75%'} />
                            </button>
                        </div>
                    </div>
                </div> :
                <div className='text-center'>
                    <p className='my-10 text-[#5a24f5] font-semibold text-5xl'>Click a conversation</p>
                </div>
            }
        </div>
    )
}

export default Conversation