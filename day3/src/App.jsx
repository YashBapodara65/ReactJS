import React, { useState } from "react"
import Form from "./Components/Form"

function App() {

  const [disp,setDisp] = useState(true);
 
  return (
    <>
    <div className="w-100">
    <header>
      <button onClick={()=>{setDisp(true)}}>Product Form</button>
      <button onClick={()=>{setDisp(false)}}>Product List</button>
    </header>
    <Form dataDisp={disp} />
    </div>
    </>
  )
}

export default App
