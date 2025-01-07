import React, { useState } from "react"
import Form from "./Components/Form"

function App() {

  const [disp,setDisp] = useState(true);
 
  return (
    <>
    <div className="w-100">
    <header className="bg-dark d-flex justify-content-center align-items-center py-3 gap-5">
      <button className="border-0 bg-dark text-white" onClick={()=>{setDisp(true)}}>Product Form</button>
      <button className="border-0 bg-dark text-white" onClick={()=>{setDisp(false)}}>Product List</button>
    </header>
    <Form dataDisp={disp} />
    </div>
    </>
  )
}

export default App
