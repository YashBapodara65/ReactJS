import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from "../components/Signup";
import Signin from "../components/Signin";
import Dashboard from "../components/Dashboard";
import PrivateRoute from "../components/PrivateRoute";

function MainRoutes() {
  return (
    <>
        <Routes>
            <Route path='/' Component={Signup} ></Route>
            <Route path='/signin' Component={Signin} ></Route>
            <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>} ></Route>
        </Routes>
    </>
  )
}

export default MainRoutes
