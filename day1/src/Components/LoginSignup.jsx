import React, { useState } from "react";
import styles from "./LoginSignup.module.css"
import Logo from "../../public/logo.png";

function LoginSignup() {
  const [state, setState] = useState(true);

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
          <h1 className={styles.head1}>Looks like you're new here!</h1>
          <p className={styles.paragraph}>Sign up with your email'id to get started</p>
        </>
        }
        <img src={Logo} className={styles.logo} alt="logo" />
      </div>
      <div className={styles.form_data}>
        {state == true ? (
          <div id="login" className="d-flex flex-column justify-content-between py-4 h-100">
            <form action="" className="mx-4">
              <input type="email" className={styles.inputs} placeholder="Enter your emailID" />
              <br />
              <input type="password" className={styles.inputs} placeholder="Enter your password" />
              <br />
              <p className="m-0 mt-3">
                By continuing, you agree to Flipkart's Terms of Use and Privacy
                Policy.
              </p>
              <input type="submit" value="Login" className={styles.submit_btn} />
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
            <form action="" className="mx-4">
              <input type="text" className={styles.inputs} placeholder="Enter your name" />
              <br />
              <input type="email" className={styles.inputs} placeholder="Enter your emailID" />
              <br />
              <input type="password" className={styles.inputs} placeholder="Enter your password" />
              <br />
              <p className="m-0 mt-3">
                By continuing, you agree to Flipkart's Terms of Use and Privacy
                Policy.
              </p>
              <input type="submit" className={styles.submit_btn} value="Continue" />
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
