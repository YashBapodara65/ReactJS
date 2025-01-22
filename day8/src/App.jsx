import React, { useEffect, useState } from 'react'
import SkeletonCode from './Components/SkeletonCode'
import DynamicForm from './Components/DynamicForm'

function App() {

  const [state, setState] = useState(true);

  const [profile, setProfile] = useState([]);

  const handleState = () => {
    setState(!state);
  }

  const userDataFun = (data) => {
    setProfile([...profile,data]);
  }

  useEffect(()=>{
    console.log(profile);
  },[profile]);
  
  return (
    <div>
        {state ? <DynamicForm handleState={handleState} userDataFun={userDataFun} /> : <SkeletonCode profile={profile} /> }
    </div>
  )
}

export default App
