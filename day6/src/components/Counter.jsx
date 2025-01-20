
import React, { useState } from "react";
import Counter2 from "./Counter2";
import Counter3 from "./Counter3";
import "./Counter.css";

function Counter()
{

    let [num, setNum] = useState(0);
    let [dispVal, setDispVal] = useState("none");

    const handleInc = () => {
        setNum(num+1);
        console.log(num);
    }

    const handleRes = () => {
        setNum(0);
    }

    const handleDec = () => {

        // way - 1
        (num > 0) ? setNum(num-1) : callAlert(true);
        console  .log(num);

        // way - 2
        // if(num > 0)
        // {
        //     setNum(num-1);
        // }
    }

    const callAlert = (con) => {
        if(con == true)
        {
            setDispVal("block") 
            setTimeout(()=>{
                setDispVal("none");
            },2000)
        }
    }

    return(
        <>
            <div className="alert-box position-fixed" style={{top:0, left:0, width:"100%", display: dispVal}}>
                <div className="alert alert-danger" role="alert">
                      Value is zero. You can't decrease....!
                </div>
            </div>
            <div className="mainCount">
                <h1 className="val">{num}</h1>
                <Counter2 className="val" num2={num}/> 
                <Counter3 className="val" num3={num}/> 
            </div>
            <div className="btns">
                <button onClick={handleDec}>-</button>
                <button onClick={handleRes}><i className="bi bi-arrow-clockwise"></i></button>
                <button onClick={handleInc}>+</button>
            </div>
        </>
    )
}

export default Counter;