import React from 'react'
import sty from "./Product.module.css"

function ProductList({arr}) {

  // console.log(Date.now());

  return (
    <div>
        <h1 className='mt-5 fs-3 text-center'>Product List</h1>
        <div className='w-100 d-flex justify-content-evenly flex-wrap gap-5 align-items-center w-100 pt-3 pb-5'>
        {arr.map((el)=>{
            return(
                <React.Fragment key={Date.now() + el.title}>
                  <div className={sty.box}>
                    <img src={el.url} style={{width:"100%", height:"300px"}} alt={el.title} />
                    <h1 className='fw-bold mt-3 fs-5 m-0'>{el.title}</h1>
                    <div className='d-flex gap-5 align-items-center mt-2'>
                      <p className='fs-5'><span className='text-success'>MRP</span> &#8377;{el.price}</p>
                    </div>
                  </div>
                </React.Fragment>
                )
            })
        }
        </div>
    </div>
  )
}

export default ProductList
