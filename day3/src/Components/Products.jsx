import React from 'react'

function Products({plist}) {
  return (
    <>
      <table className='table-bordered w-100'>
        <thead>
          <th>Name</th>
          <th>Image</th>
          <th>Price</th>
        </thead>
        <tbody>
        {
            // console.log("products list : ",plist)
            plist.map((el)=>{
              return(
                <>
                  <tr>
                    <td>{el.pName}</td>
                    <td><img src={el.pImage} style={{width:"300px",height:"300px"}} alt={el.pName} /></td>
                    <td>{el.pPrice}</td>
                  </tr>
                </>
              )
            })
        }
        </tbody>
      </table>
    </>
  )
}

export default Products
