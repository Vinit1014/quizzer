'use client'
import React, { useEffect, useState } from 'react'

const Upvotebutton = ({userArray}) => {

  const [user,setUser] = useState(userArray?.value);
  
  useEffect(()=>{
    console.log(user);
  },[user])

  useEffect(()=>{
    setUser(userArray?.value)
  },[userArray])

  return (
    <button className="m-6 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:bg-indigo-800 hover:scale-105" onClick={()=>{console.log("Hello world");
    }}>
        Increment button
    </button>
  )
}

export default Upvotebutton