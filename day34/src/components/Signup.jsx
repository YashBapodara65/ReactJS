import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

import { toast } from 'react-toastify';

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log(res);

      await setDoc(doc(db, "Users", res.user.uid), {
        name: formData.username,
        email: formData.email,
      });

      toast.success("Registration successfully!");

      navigate("/signin");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already in use. Please try another email.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password is too weak. Please use a stronger password.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format. Please enter a valid email.");
      } else {
        toast.error("An error occurred: " + error.message);
      }
      console.error(error);
    }
  };

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <Box
          component="form"
          //   sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className="flex w-fit md:w-200  flex-col border border-gray-400 shadow-2xl p-5 md:px-20 md:py-15"
        >
          <h1 className="text-center mb-8 text-3xl font-semibold">
            Register Form
          </h1>
          <div className="grid grid-cols-1 w-full gap-x-10 gap-y-8">
            <div className="col-span-1">
              <TextField
                id="outlined-number"
                label="Username *"
                type="text"
                placeholder="Enter your name"
                value={formData.username}
                name="username"
                className="w-full"
                onChange={handleChange}
                size="small"
                sx={{
                  "& .MuiInputLabel-root": { fontSize: "1.25rem" }, // Adjust size
                }}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </div>
            <div className="col-span-1">
              <TextField
                id="outlined-number"
                label="Email *"
                type="text"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full"
                size="small"
                name="email"
                sx={{
                  "& .MuiInputLabel-root": { fontSize: "1.25rem" }, // Adjust size
                }}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </div>
            <div className="col-span-1">
              <TextField
                id="outlined-number"
                label="Password *"
                value={formData.password}
                placeholder="Enter your password"
                type="text"
                onChange={handleChange}
                name="password"
                className="w-full"
                size="small"
                sx={{
                  "& .MuiInputLabel-root": { fontSize: "1.25rem" }, // Adjust size
                }}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </div>
            <button type="submit" className="bg-blue-600 col-span-1 text-white text-lg font-semibold py-2 w-full cursor-pointer">
              Sign Up
            </button>
          </div>
        <h1 className="text-center mt-7 font-semibold">Already have an account? <Link className="text-blue-600" to={"/signin"}>Login here</Link></h1>
        </Box>
      </div>
    </>
  );
}

export default Signup;
