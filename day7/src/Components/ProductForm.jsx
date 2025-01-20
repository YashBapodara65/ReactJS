import React, {useState} from 'react'
import sty from "./Product.module.css";

function ProductForm({handleData, handleStatus}) {

  const [formData, setFormData] = useState({
      url : "",
      title : "",
      price : ""
  });

  const [valid, setValid] = useState({
      url : true,
      title : true,
      price : true
  })

  const handleChange = (e) => {
      const {name,value} = e.target;
      setFormData({...formData,[name] : value});
      // console.log(name,value);
  }

  const handleBlur = (e) => {
      const {name, value} = e.target;

      if(value == "" && name == "url")
      {
          setValid({...valid,[name] : false})
      }
      
      // let titleRegex = /^[0-9A-Za-z]{6}$/;
      const titleRegex = /^[0-9A-Za-z ]+$/;
      
      if(titleRegex.test(value) == false && name == "title")
      {
          setValid({...valid,[name] : false})
      }

      const priceRegex = /^[0-9]+$/;
      
      if(priceRegex.test(value) == false && name == "price")
      {
          setValid({...valid,[name] : false})
      }

  }

  const handleFocus = (e) => {
      const {name} = e.target;

      setValid({...valid,[name] : true});

  }

  const handleSubmit = (e) => {
      e.preventDefault();

      const urlCheck = formData.url != "";

      // const titleCheck = /^[0-9A-Za-z]{6}$/.test(formData.title);
      const titleCheck = /^[0-9A-Za-z ]+$/.test(formData.title);

      const priceCheck = /^[0-9]+$/.test(formData.price);

      // console.log(urlCheck);
      // console.log(titleCheck);
      // console.log(priceCheck);

      setValid({
        url : urlCheck,
        title : titleCheck,
        price : priceCheck
      })

      if(urlCheck && titleCheck && priceCheck)
      {
        handleData(formData);
        
        setFormData({
          url : "",
          title : "",
          price : ""
        })

        handleStatus();
      }

  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center gap-4'>
      <h1 className='fs-3 mt-5'>Product Form</h1>
      <form action="" onSubmit={handleSubmit} className={sty.form_data}>
        <div className='d-flex flex-column mt-4 align-items-start px-4'>
          <label htmlFor="">Image URL</label>
          <input value={formData.url} type="text" style={{borderColor: valid.url ? "" : "red"}} className='w-100 form-control mt-2 shadow-none rounded-0' onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} placeholder='Image URL' name='url' />
          <span className='mt-2 mb-3' style={{color: valid.url ? "" : "red"}}>{valid.url ? "" : "Please fillup this field...!"}</span>
        </div>
        <div className='d-flex flex-column align-items-start px-4'>
          <label htmlFor="">Product Name</label>
          <input value={formData.title} type="text" style={{borderColor: valid.title ? "" : "red"}} className='w-100 form-control mt-2 shadow-none rounded-0' onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} placeholder='Product Title' name='title' />
          <span className='mt-2 mb-3' style={{color: valid.title ? "" : "red"}}>{valid.title ? "" : "Please enter the product name...!"}</span>
        </div>
        <div className='d-flex flex-column align-items-start px-4'>
          <label htmlFor="">Product Price </label>
          <input value={formData.price} type="text" style={{borderColor: valid.price ? "" : "red"}} className='w-100 form-control mt-2 shadow-none rounded-0' onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} placeholder='Product Price' name='price' />
          <span className='mt-2 mb-3' style={{color: valid.price ? "" : "red"}}>{valid.price ? "" : "Please enter the only digits...!"}</span>
        </div>
        <div className='d-flex flex-column align-items-start px-4'>
          <input className='mt-3 btn btn-primary mb-4 w-100' type="submit" value="Add Product" />
        </div>
      </form>
    </div>
  )
}

export default ProductForm
