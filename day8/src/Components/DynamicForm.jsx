import React, { useEffect, useState } from "react";
import "../index.css";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { BorderColor } from "@mui/icons-material";


function DynamicForm({userDataFun, handleState}) {

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    file: "",
    skill: [""],
    hobby: [""],
  });

  const [valid, setValid] = useState({
    firstname: true,
    lastname: true,
    file : true,
    email: true,
    password: true,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // console.log(e.target.files[0].name);

    name == "file"
      ? setFormData({ ...formData, [name]: files[0].name })
      : setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value} = e.target;

    if (name == "firstname" && value == "") {
        setValid({ ...valid, [name]: false });
    }


    if (name == "lastname" && value == "") {
        setValid({ ...valid, [name]: false });
    }

    const emlRegex = /^[\w.+-]+@[\w.-]+\.[\w.-]+$/;
    if(emlRegex.test(value) == false && name == "email")
    {
        setValid({ ...valid, [name]: false });
    }

    const pwdRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if(pwdRegex.test(value) == false && name == "password")
    {
        setValid({ ...valid, [name]: false });
    }

  };

  const handleFocus = (e) => {
    const { name } = e.target;

    setValid({ ...valid, [name]: true });
  };

  const handleMultiInputs = (e, index) => {
    let arr =
      e.target.name == "skill" ? [...formData.skill] : [...formData.hobby];
    arr[index] = e.target.value;

    e.target.name == "skill"
      ? setFormData({ ...formData, skill: arr })
      : setFormData({ ...formData, hobby: arr });
  };

  const addField = (fieldName) => {
    setFormData({ ...formData, [fieldName]: [...formData[fieldName], ""] });
  };

  const delSkill = (isSkill, index) => {
    let arr = isSkill ? [...formData.skill] : [...formData.hobby];
    arr.splice(index, 1);

    isSkill
      ? setFormData({ ...formData, skill: arr })
      : setFormData({ ...formData, hobby: arr });
    // console.log(e.target.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newFirstUserRegex = formData.firstname != "";
    let newLastUserRegex = formData.lastname != "";
    let newEmailRegex = /^[\w.+-]+@[\w.-]+\.[\w.-]+$/.test(formData.email);
    let newPasswordRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(formData.password);
  
    setValid({
      firstname: newFirstUserRegex,
      lastname: newLastUserRegex,
      email: newEmailRegex,
      password: newPasswordRegex,
    })

    if(newFirstUserRegex && newLastUserRegex && newEmailRegex && newPasswordRegex)
    {
        // console.log(formData);

        userDataFun(formData);
        handleState();
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          file: "",
          skill: [""],
          hobby: [""],
        })
    }
  };

  // useEffect(()=>{
  //   console.log(profile);
  // },[profile])

  // console.log(formData);

  return (
    <>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="w-full rounded-xl flex mt-10 mb-10 shadow-xl border border-gray-200 px-10 py-20 lg:w-2/4 justify-center gap-6 flex-col">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">
                    Click to upload your profile photo
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                name="file"
                onBlur={handleBlur}
                onFocus={handleFocus}
                onChange={handleChange}
                className="hidden"
              />
              <p
                className={formData.file ? "" : "hidden"}
                style={{ marginBottom: "20px" }}
              >
                Selected File : {formData.file}
              </p>
            </label>
          </div>
          <div className="grid gap-6  md:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
              >
                First name
              </label>
              <input
                type="text"
                id="first_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={formData.firstname}
                onFocus={handleFocus}
                name="firstname"
                className={`text-sm placeholder-gray-400 rounded-lg block w-full p-2.5 focus:outline-none border-2 focus:border-blue-700 ${(valid.firstname ? "" : "border-red-500")}`}
                placeholder="John"
              />
              {valid.firstname ? "" : <p className="ps-2 pt-2 text-red-500">Enter your first name</p>}
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
              >
                Last name
              </label>
              <input
                type="text"
                id="last_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={formData.lastname}
                onFocus={handleFocus}
                name="lastname"
                className={`text-sm placeholder-gray-400 rounded-lg block w-full p-2.5 focus:outline-none border-2 focus:border-blue-700 ${(valid.lastname ? "" : "border-red-500")}`}
                placeholder="Doe"
              />
              {valid.lastname ? "" : <p className="ps-2 pt-2 text-red-500">Enter your last name</p>}
            </div>
            <div className="">
              <label
                htmlFor="email"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                onChange={handleChange}
                value={formData.email}
                onBlur={handleBlur}
                onFocus={handleFocus}
                name="email"
                className={`text-sm placeholder-gray-400 rounded-lg block w-full p-2.5 focus:outline-none border-2 focus:border-blue-700 ${(valid.email ? "" : "border-red-500")}`}
                placeholder="example@gmail.com"
              />
              {valid.email ? "" : <p className="ps-2 pt-2 text-red-500">Email format is invalid</p>}
            </div>
            <div className="">
              <label
                htmlFor="password"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                onBlur={handleBlur}
                value={formData.password}
                onFocus={handleFocus}
                onChange={handleChange}
                name="password"
                className={`text-sm placeholder-gray-400 rounded-lg block w-full p-2.5 focus:outline-none border-2 focus:border-blue-700 ${(valid.password ? "" : "border-red-500")}`}
                placeholder="Doe"
              />
              {valid.password ? "" : <p className="ps-2 pt-2 text-red-500">contains at least eight characters. Including at least one number, includes both lower and uppercase letters, include at least one special characters</p>}
            </div>
          </div>
            <div className="">
              <label className="flex gap-5 items-center justify-start mb-2 text-md font-medium text-gray-900 dark:text-white">
                Skill
                <span
                  className="font-medium cursor-pointer text-black rounded-lg text-sm mb-1"
                  onClick={() => addField("skill")}
                >
                  <AddCircleOutlineOutlinedIcon />
                </span>
              </label>
              {formData.skill.map((el, index) => {
                return (
                  <div className="relative py-2" key={index + "skill"}>
                    <input
                      type="text"
                      placeholder="Skill"
                      value={el}
                      className="text-sm placeholder-gray-400 rounded-lg block pe-16 w-full p-2.5 focus:outline-none border-2 focus:border-blue-700"
                      name="skill"
                      onChange={(e) => {
                        handleMultiInputs(e, index);
                      }}
                      id={`skill-${index}`}
                    />
                    {formData.skill.length > 1 ? (
                      <button
                        type="button"
                        name="skills"
                        className="absolute top-1/4 end-4"
                        onClick={() => {
                          delSkill(true, index);
                        }}
                      >
                        <HighlightOffOutlinedIcon></HighlightOffOutlinedIcon>
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
            <div className="">
              <label className="flex gap-5 items-center justify-start mb-2 text-md font-medium text-gray-900 dark:text-white">
                Hobby
                <span
                  className="font-medium cursor-pointer text-black rounded-lg text-sm mb-1"
                  onClick={() => addField("hobby")}
                >
                  <AddCircleOutlineOutlinedIcon />
                </span>
              </label>
              {formData.hobby.map((el, index) => {
                return (
                  <div className="relative py-2" key={index + "hobby"}>
                    <input
                      type="text"
                      placeholder="Hobby"
                      value={el}
                      className="text-sm placeholder-gray-400 rounded-lg block pe-16 w-full p-2.5 focus:outline-none border-2 focus:border-blue-700"
                      name="hobby"
                      onChange={(e) => {
                        handleMultiInputs(e, index);
                      }}
                      id={`hobby-${index}`}
                    />
                    {formData.hobby.length > 1 ? (
                      <button
                        type="button"
                        name="skills"
                        className="absolute top-1/4 end-4"
                        onClick={() => {
                          delSkill(false, index);
                        }}
                      >
                        <HighlightOffOutlinedIcon></HighlightOffOutlinedIcon>
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          {/* <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I agree with the{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
              .
            </label>
          </div> */}
          <button
            type="submit"
            className="text-white bg-purple-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default DynamicForm;