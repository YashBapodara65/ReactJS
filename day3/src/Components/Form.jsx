import React, { useState } from 'react'
import Products from './Products';

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

        useStoreData([...store_data,obj]);

    }

    console.log(store_data);

    return (
        <>
        {props.dataDisp == true ?
        <div className='' id='product-form'>
            <form action="">
                <input type="text" onChange={(e)=>{setPImag(e.target.value)}} placeholder='Image URL' /><br/>
                <input type="text" onChange={(e)=>{setPName(e.target.value)}} placeholder='Product name' /><br/>
                <input type="text" onChange={(e)=>{setPPrice(e.target.value)}} placeholder='Product price' /><br/>
                <button type='button' onClick={handleSubmit}>Add Product</button>
            </form>
        </div>
        :
        <Products plist={store_data}/>
        }
        </>
    )
}

export default Form;