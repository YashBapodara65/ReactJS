import React, { useEffect, useState } from 'react'
import sty from "./Styling.module.css";

function UseEffectHook() {

  const [store_data,setStoreData] = useState(null);

  useEffect(()=>{
    fetch("https://dummyjson.com/products")
    .then((res)=>res.json())
    .then((res)=>{
      console.log(res);
      setStoreData(res.products);
      // console.log(store_data);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[]);

  return (
    <div>
        <header className='bg-dark py-2 d-flex justify-content-between px-5 align-items-center'>
          <h1 className='text-white fs-4 m-0'>Logo</h1>
          <ul className='d-flex m-0 p-0 gap-5'>
            <li className={sty.list}><a href="">Home</a></li>
            <li className={sty.list}><a href="">About</a></li>
            <li className={sty.list}><a href="">Products</a></li>
            <li className={sty.list}><a href="">Contact</a></li>
          </ul>
        </header>
        <div className='d-flex justify-content-evenly gap-5 my-4 flex-wrap'>
        {
          store_data == null
          ?
          <h1>Loading...</h1>
          :
          store_data.map((el)=>{
              return(
                <>
                  <div className={sty.box} style={{position:"relative"}}>
                    <img src={el.thumbnail} style={el.prod_img} alt="" />
                    <h1 className='fw-bold mt-3 fs-5 m-0'>{el.title}</h1>
                    <p className='m-0 mt-2'>{el.brand} ({el.category})</p>
                    <div className='d-flex gap-5 align-items-center mt-2'>
                      <p className='fs-5'><span className='text-success'>MRP</span> &#8377;{el.price}</p>
                      <p style={{color:"orangered"}} className='d-flex gap-1'>
                      {
                        (el.rating >= 4.5) 
                        ? <><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-half"></i></>
                        : (el.rating >= 4) ? <><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i></> 
                        : (el.rating >= 3.5) ? <><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-half"></i><i className="bi bi-star"></i></> 
                        : (el.rating >= 3) ? <><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i><i className="bi bi-star"></i></> 
                        : <><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star"></i><i className="bi bi-star"></i></> 
                      }
                      </p>
                    </div>
                    <p>{el.description.substr(0,80)}...</p>
                    <p style={{position:"absolute", width:"65px", background:"orangered", height:"65px",top:"5%", right:"5%"}} className='d-flex justify-content-center align-items-center rounded-circle text-white'>{el.discountPercentage}%</p>
                  </div>
                </>
              )
          })
        } 
        </div>
    </div>
  )
}

export default UseEffectHook;
