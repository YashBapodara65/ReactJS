import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, provider } from "../../firebaseConfig";
import { toast } from "react-toastify";
import {Link} from "react-router-dom";
import Google from "../../public/search.png";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { doc, setDoc } from "firebase/firestore";

function Signin() {
  const [formData, setFormData] = useState({
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

    if (!formData.email || !formData.password) {
      toast.error("Please fill in both fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log(res);
      navigate("/dashboard");
      toast.success("Login Successfully!");
    } catch (error) {
      // toast.error(error.message);
      toast.error("Email or password does not matched...!");
    }
  };

  const handleGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      console.log(res);
      await setDoc(doc(db, "Users", res.user.uid), {
        name: res.user.displayName || "No Name",
        email: res.user.email,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Google Sign-in failed!");
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
          className="flex w-fit md:w-150  flex-col border border-gray-400 shadow-2xl p-5 md:px-20 md:py-15"
        >
          <h1 className="text-center mb-8 text-3xl font-semibold">
            Login Form
          </h1>
          <div className="grid grid-cols-1 w-full gap-x-10 gap-y-8">
            <div className="col-span-1">
              <TextField
                id="outlined-number1"
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
                id="outlined-number2"
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
            <button
              type="submit"
              className="bg-blue-600 col-span-1 text-white text-lg font-semibold py-2 w-full cursor-pointer"
            >
              Sign In
            </button>
          </div>
        <h1 className="text-center mt-7 font-semibold">Don't have an Account? <Link className="text-blue-600" to={"/"}>Create Account</Link></h1>
        <div className="flex justify-center items-center">
            <div
              onClick={handleGoogle}
              className="flex border items-center gap-2 mt-5 py-1 px-5 cursor-pointer justify-center"
            >
              <h1 className="text-center font-semibold">Sign with</h1>
              <img src={Google} className="w-5" />
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}

export default Signin;
