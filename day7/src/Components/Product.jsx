import React, { useState } from 'react'
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import sty from "./Product.module.css";

function Product() {

   const [state, setState] = useState(true); 

   const [arr,setArr] = useState([]);

   const store_data = (data) => {
    setArr([...arr,data]);
   }

   const handleData = (formData) => {

      setArr([...arr, formData])
      // arr && console.log(arr);
  }

  const handleStatus = () => {
    setState(!state);
  }


  return (
    <>
    <header className={sty.headers}>
      <h1 className={sty.heading}>Logo</h1>
      <div className='d-flex justify-content-center align-items-center gap-5'>
        {
          state ?
          <button className="btn btn-black fs-5 border-0 text-white" onClick={handleStatus}>Product List</button>
          :
          <button className="btn btn-black fs-5 border-0 text-white" onClick={handleStatus}>Product Form</button>
        }
      </div>
    </header>

    {state ? <ProductForm handleStatus={handleStatus} handleData={handleData} /> : <ProductList arr={arr} />}
    </>
  )
}

export default Product
