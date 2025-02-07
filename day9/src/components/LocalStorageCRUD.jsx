import React, { useEffect, useState } from 'react'
import tbl from "./LocalStorageCRUD.module.css";

function LocalStorageCRUD() {

  const [name, setName] = useState("");
  const [sub, setSub] = useState("");
  const [city, setCity] = useState("");

  const [record, setRecord] = useState([]);

  const [editIndex, setEditIndex] = useState(null);

  useEffect(()=>{
    setTimeout(()=>{
      let data = JSON.parse(localStorage.getItem("Students")) || [];
      setRecord(data);
    },500)
  },[])

  const handleDelete = (userId) => {
    let data = record.filter((item)=> item.id != userId)
    setRecord(data);
    localStorage.setItem("Students",JSON.stringify(data));
  } 

  const handleEdit = (userId) => {
    let singleData = record.find((item)=> item.id == userId)
    setName(singleData.name);
    setSub(singleData.sub);
    setCity(singleData.city);
    setEditIndex(userId);
  }

  const handleSubmit = () => {
    if(editIndex == null)
    {
      let obj = {id: Date.now(), name, sub, city}
      setRecord([...record,obj]);
      localStorage.setItem("Students",JSON.stringify([...record,obj]));
    }
    else
    {
      let singleData = record.find((item)=>item.id == editIndex);
      singleData.id = editIndex;
      singleData.name = name;
      singleData.sub = sub;
      singleData.city = city;
      console.log(singleData);
      localStorage.setItem("Students",JSON.stringify(record));
      setEditIndex(null);
    }

    setName("");
    setSub("");
    setCity("");

  }

  return (
    <>
    <div className='row w-100 m-0 d-flex justify-content-evenly align-items-center' style={{height:"100vh"}}>
    <div className='col-lg-4 shadow-lg p-5 rounded-3'> 
      <h1 className='fs-3'>Student Data</h1>
      <input type="text" className='w-100 form-control border border-dark shadow-none mt-4' placeholder='Enter name' value={name} onChange={(e)=>{setName(e.target.value)}} /><br/>
      <input type="text" className='w-100 form-control border border-dark shadow-none' placeholder='Enter subject' value={sub} onChange={(e)=>{setSub(e.target.value)}} /><br/>
      <input type="text" className='w-100 form-control border border-dark shadow-none' placeholder='Enter city' value={city} onChange={(e)=>{setCity(e.target.value)}} /><br/>
      <button className={(editIndex == null) ? "w-100 btn btn-primary shadow-none" : "w-100 btn btn-warning shadow-none"} onClick={handleSubmit}>{editIndex == null ? "Submit" : "Update"}</button>
    </div>
    <div className={`col-lg-7 h-100 d-flex justify-content-center align-items-center overflow-auto ${tbl}`}>
      <table className='w-100'>
        <thead>
          {
            (record.length > 0)
            ?
            <tr>
            <th className='bg-primary p-3 fs-5 fw-bold text-center border-2 border-white text-white'>Id</th>
            <th className='bg-primary p-3 fs-5 fw-bold text-center border-2 border-white text-white'>Name</th>
            <th className='bg-primary p-3 fs-5 fw-bold text-center border-2 border-white text-white'>Subject</th>
            <th className='bg-primary p-3 fs-5 fw-bold text-center border-2 border-white text-white'>City</th>
            <th className='bg-primary p-3 fs-5 fw-bold text-center border-2 border-white text-white' colSpan={2}>Action</th>
            </tr>
            :
            <tr></tr>
          }
        </thead>
        <tbody>
          {
            record.length > 0 ?
            record.map((e,i)=>{
              return (
                  <tr key={i}>
                    <td className='text-center bg-secondary border-2 border-white text-white p-3'>{e.id}</td>
                    <td className='text-center bg-secondary border-2 border-white text-white p-3'>{e.name}</td>
                    <td className='text-center bg-secondary border-2 border-white text-white p-3'>{e.sub}</td>
                    <td className='text-center bg-secondary border-2 border-white text-white p-3'>{e.city}</td>
                    <td className='text-center bg-secondary border-2 border-white text-white p-3'><button className='btn btn-primary' onClick={()=>handleEdit(e.id)}>Edit</button></td>
                    <td className='text-center bg-secondary border-2 border-white text-white p-3'><button className='btn btn-danger' onClick={()=>handleDelete(e.id)}>Delete</button></td>
                  </tr>
              )
            })
            :
            <tr>
              <td className='text-center text-danger'><h1 className='display-3 fw-bold'>Loading...</h1></td>
            </tr>
          }
        </tbody>
      </table>
    </div>
    </div>
    </>
  )
}

export default LocalStorageCRUD
