import axios from "axios";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SignupInput } from "zod-common";
import { BACKEND_URL } from "../config";


export function Auth({type}:{type:"signup" | "signin"}) {
  const navigate=useNavigate();
  const [postInput,setPostInput]=useState<SignupInput>({
    name:"",
    email:"",
    password:""
  })

  async function sendRequest(){
    try {
      const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInput)
      const jwt=response.data
      localStorage.setItem("token",jwt)
      navigate("/blogs")
    } catch (error) {
      alert("Error while signing up")}
  }

    return (
      <div className="h-screen flex flex-col justify-center ">
        <div className="flex justify-center">
          <div className="">
            <div className="px-12">
               <div className="text-3xl font-bold">Create Account</div>
               <div className="text-slate-500">{type ==="signin" ? "Don't have an account" : "Already have an account"} <Link className="underline text-blue-600" to={type === "signin" ?"/signup":"/signin"}>{type ==="signin"?"Sign up" : "Sign in"}</Link></div>
            </div>
            <div className="pt-6">
              
              {type==="signup" ? 
               <><SignupLabelInput label="name"
                  placeholder="Enter your name"
                  onChange={(e) => {
                    setPostInput({
                      ...postInput,
                      name: e.target.value
                    });
                  } } /></> : null}
               
                <SignupLabelInput label="username"
                    placeholder="@gmail.com"
                    onChange={(e) => {
                      setPostInput({
                        ...postInput,
                        email: e.target.value
                      });
                    } } />

               <SignupLabelInput label="password" type={"password"}
               placeholder="Enter your password" 
               onChange={(e) =>{
                setPostInput({
                  ...postInput,
                  password:e.target.value
                })
               }}/>
                 <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full mt-8 cursor-pointer">{type == "signup" ? "Sign up" : "Sign in"}</button>
               </div>
           </div>
        </div>
      </div>
    )
}

interface LabelledInputtype{
    label:string,
    placeholder:string,
    onChange:(e :ChangeEvent<HTMLInputElement>) => void;
    type?:string;
}

export function SignupLabelInput({label,placeholder,onChange,type}: LabelledInputtype){
    return(
        <div className="flex flex-col mt-3 gap-2 ">
          <label className="font-bold">{label}</label>
          <input type={type || "text"} onChange={onChange} className="border rounded p-2 hover:outline-none" placeholder={placeholder} required/>
        </div>
    )
}
