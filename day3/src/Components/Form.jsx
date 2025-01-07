import React, { useState } from 'react'
import Products from './Products';
import sty from "./Styling.module.css";
import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';

function Form(props) {

    const [pimg,setPImag] = useState("");
    const [pname,setPName] = useState("");
    const [pprice,setPPrice] = useState("");

    const [store_data,useStoreData] = useState([]);

    const [disp,setDisp] = useState(true);

    const handleSubmit = () =>{
        let obj = {
            pImage : pimg,
            pName : pname,
            pPrice : pprice
        }

        if(pimg && pname && pprice)
        {
            useStoreData([...store_data,obj]);

            Swal.fire({
                title: "Product add successfully...!",
                // text: "You clicked the button!",
                icon: "success"
            });

            setPImag("");
            setPName("");
            setPPrice("");

        }
        else
        {
            Swal.fire({
                title: "Please fillup the form field...!",
                // text: "You clicked the button!",
                icon: "error"
            });
        }

    }

    console.log(store_data);

    return (
        <>
        {props.dataDisp == true ?
        (
        <>
        <h1 className={sty.heading}>Product Form</h1>
        <div className="d-flex justify-content-center" id='product-form'>
            <form action="" className={sty.form_style}>
                <div className='my-3 px-5'>
                <label htmlFor="">Image URL</label>
                <input type="text" value={pimg} className='mt-2 form-control shadow-none rounded-0' onChange={(e)=>{setPImag(e.target.value)}} placeholder='Image URL' /><br/>
                </div>
                <div className='my-3 px-5'>
                <label htmlFor="">Product Name</label>
                <input type="text" value={pname} className='mt-2 form-control shadow-none rounded-0' onChange={(e)=>{setPName(e.target.value)}} placeholder='Product name' /><br/>
                </div>
                <div className='my-3 px-5'>
                <label htmlFor="">Product Price</label>
                <input type="text" value={pprice} className='mt-2 form-control shadow-none rounded-0' onChange={(e)=>{setPPrice(e.target.value)}} placeholder='Product price' /><br/>
                </div>
                <div className='my-4 px-5'>
                <button className='w-100 btn btn-primary' type='button' onClick={handleSubmit}>Add Product</button>
                </div>
            </form>
        </div>
        </>
        )
        :
        <Products plist={store_data}/>
        }
        </>
    )
}

export default Form;