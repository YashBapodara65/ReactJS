import React from 'react'
import LoginSignup from './Components/LoginSignup'
import styles from "./Components/LoginSignup.module.css"

function App() {
  
  return (
    <>
      <div className={styles.main}>
          <LoginSignup />
      </div>
    </>
  )
}

export default App;