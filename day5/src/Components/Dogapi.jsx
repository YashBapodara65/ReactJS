import React from 'react'
import { useEffect, useState } from "react"

function Dogapi() {

    const [dog,setDog] = useState(null);

    useEffect(()=>{
      fetchDog()
    },[])

    function fetchDog()
    {
        setDog(null);
        fetch("https://dog.ceo/api/breeds/image/random")
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res);
            setDog(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
  

  return (
    <div style={{background:"black",height:"100vh",width:"100%"}} className='d-flex justify-content-center flex-column align-items-center gap-5'>
        {
            dog == null 
            ? 
            <h1 className='text-white'>Loading</h1>
            :
            <img src={dog.message} className='border border-4 border-white' style={{width:"500px",height:"500px"}} alt='' />
        }
        <button onClick={fetchDog} className='btn btn-primary fs-5 fw-bold px-5 py-2'>Refresh</button>
    </div>
  )
}

export default Dogapi
