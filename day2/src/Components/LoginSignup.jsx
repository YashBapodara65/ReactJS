import React, { useState } from "react";
import styles from "./LoginSignup.module.css"
import Logo from "../../public/logo.png";
import Swal from 'sweetalert2';

function LoginSignup() {
  const [state, setState] = useState(true);

  const [rusername,setRUsername] = useState("");
  const [remail,setREmail] = useState("");
  const [rpassword,setRPassword] = useState("");

  const [store_data,setStoreData] = useState([]);

  const handleSignup = () => 
  {
      let obj = {
        // you can direct pass same variable as a key 
        // rusername,
        // remail,
        // rpassword

        Username : rusername,
        Email : remail,
        Password : rpassword

      }

      // let res = store_data.filter((el) => el.Email == remail || el.Password == rpassword);
      let res = store_data.filter((el) => el.Email == remail);

      if(res.length > 0)
      {
          if(res[0].Password == rpassword)
          {
            Swal.fire({
              title: 'Please change your password...!',
              // text: ' is a SweetAlert notification',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
          else
          {
            Swal.fire({
              title: 'Please change your emailID...!',
              // text: ' is a SweetAlert notification',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
      }
      else
      {
          Swal.fire({
            title: 'Please our login...!',
            // text: ' is a SweetAlert notification',
            icon: 'info',
            confirmButtonText: 'OK',
          });
          setStoreData([...store_data,obj]);
          setState(true);
          setRUsername("");
          setREmail("");
          setRPassword("");
      }


  }
  
  console.log(store_data);

  const [lemail,setLEmail] = useState("");
  const [lpassword,setLPassword] = useState("");

  const handleLogin = () => {
      // let ans = store_data.filter((el)=> el.Email == lemail && el.Password == lpassword);
      let ans = store_data.filter((el)=>el.Email == lemail);
      console.log(ans);

      if(ans.length == 0)
      {
          // alert("email does not match")
          Swal.fire({
            title: 'Email does not match...!',
            // text: ' is a SweetAlert notification',
            icon: 'error',
            confirmButtonText: 'OK',
          });
      }
      else if(ans[0].Password != lpassword)
      {
          // alert("password does not match")
          Swal.fire({
            title: 'Password does not match...!',
            // text: ' is a SweetAlert notification',
            icon: 'error',
            confirmButtonText: 'OK',
          });
      }
      else
      {
        // alert("login successfully");
          Swal.fire({
            title: 'Login Successfully!',
            // text: ' is a SweetAlert notification',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          setLEmail("");
          setLPassword("");
      }

  }

  return (
    <>
      <div className={styles.box1}>
        {state == true ? 
        <>
          <h1 className={styles.head1}>Login</h1>
          <p className={styles.paragraph}>Get access to your Orders, Wishlist and Recommendations</p>
        </>
        :
        <>
          <h1 className={styles.head1}>Looks like you were new here!</h1>
          <p className={styles.paragraph}>Sign up with your emailID to get started</p>
        </>
        }
        <img src={Logo} className={styles.logo} alt="logo" />
      </div>
      <div className={styles.form_data}>
        {state == true ? (
          <div id="login" className="d-flex flex-column justify-content-between py-4 h-100">
            <form onSubmit={(e)=>{e.preventDefault()}} action="" className="mx-4">
              <input value={lemail} type="email" onChange={(e)=>{setLEmail(e.target.value)}} className={styles.inputs} placeholder="Enter your emailID" />
              <br />
              <input value={lpassword} type="password" onChange={(e)=>{setLPassword(e.target.value)}} className={styles.inputs} placeholder="Enter your password" />
              <br />
              <p className="m-0 mt-3">
                By continuing, you agree to Flipkart Terms of Use and Privacy
                Policy.
              </p>
              <button type="button" onClick={handleLogin} className={styles.submit_btn}>Login</button>
            </form>
              <p
                onClick={() => {
                  setState(false);
                }}

                className={styles.link}
              >
                New to Flipkart? Create an account
              </p>
          </div>
        ) : (
          <div id="signup" className="d-flex flex-column justify-content-between py-4 h-100">
            <form onSubmit={(e)=>{e.preventDefault()}} action="" className="mx-4">
              <input value={rusername} type="text" onChange={(e)=>{setRUsername(e.target.value)}} className={styles.inputs} placeholder="Enter your name" />
              <br />
              <input value={remail} type="email" onChange={(e)=>{setREmail(e.target.value)}} className={styles.inputs} placeholder="Enter your emailID" />
              <br />
              <input value={rpassword} type="password" onChange={(e)=>{setRPassword(e.target.value)}} className={styles.inputs} placeholder="Enter your password" />
              <br />
              <p className="m-0 mt-3">
                By continuing, you agree to Flipkart Terms of Use and Privacy
                Policy.
              </p>
              <button type="button" onClick={handleSignup} className={styles.submit_btn}>Continue</button>
              <br />
              <button
                onClick={() => {
                  setState(true);
                }}
                type="button"
                className="btn w-100 rounded-0 mt-4 bg-light text-primary shadow"
              >
                Existing User? Log in
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default LoginSignup;
