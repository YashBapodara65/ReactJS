import React from 'react'
import sty from "./Styling.module.css";

function Products({plist}) {

  let SrNo = 0;

  return (
    <>
      <h1 className={sty.heading}>Product List</h1>
      <div className="table-responsive">
      <table className={sty.table_style}>
        <thead>
          <tr>
          <th className='border-2 border-light bg-primary p-2 text-center'>Sr.No</th>
          <th className='border-2 border-light bg-primary p-2 text-center'>Name</th>
          <th className='border-2 border-light bg-primary p-2 text-center'>Image</th>
          <th className='border-2 border-light bg-primary p-2 text-center'>Price</th>
          </tr>
        </thead>
        <tbody>
        {
            // console.log("products list : ",plist)
            plist.map((el,i)=>{
              return(
                <>
                  <tr>
                    <td className='border-2 fs-5 border-light bg-dark text-white p-2 text-center'>{i+1}</td>
                    <td className='border-2 fs-5 border-light bg-dark text-white p-2 text-center'>{el.pName}</td>
                    <td className='border-2 border-light bg-dark text-white p-2 text-center'><img src={el.pImage} style={{width:"200px",height:"200px"}} alt={el.pName} /></td>
                    <td className='border-2 fs-5 border-light bg-dark text-white p-2 text-center'>{el.pPrice}</td>
                  </tr>
                </>
              )
            })
        }
        </tbody>
      </table>
      </div>
    </>
  )
}

export default Products
