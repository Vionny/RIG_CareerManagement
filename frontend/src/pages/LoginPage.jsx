"use client"

import "../app/globals.css"
import React, { useState } from "react"
const axios = require("axios")

import { useRouter } from "next/navigation"
import { connectToSOAP } from "@/SLC/SOAP"
import { getAst } from "../components/UserContext";
const LoginPage = () => {
    const router = useRouter();
    const [initialInput, setInitialInput] =useState()
    const [passwordInput, setPasswordInput] = useState()
    const [errText, setErrorText] = useState()
    const loginButtonClick = async (e) =>{
        if(initialInput == "" || initialInput == undefined){
            setErrorText("Please input your initial")
        }else if(passwordInput == "" || passwordInput == undefined){
            setErrorText("Please input your password")
        }else{
            var lower = initialInput.substring(0,2).toLowerCase()
            var gen = initialInput.substring(2,initialInput.length)
            var initial = lower + gen
            var res = await connectToSOAP(initial,passwordInput)
            console.log(res)
            if(res == 'Success'){
                
                console.log('Success')
                axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getUser/'+initial.toUpperCase()).then((res) => {
                    // console.log(res.data.userrole)
                    sessionStorage.setItem('initial', initial.toUpperCase())
    
                    axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+ '/getCurrSemester').then((res)=>{
                        sessionStorage.setItem('selectedSemester',res.data[0].semesterid)
                        router.push('/home')
                    })
                    // setUsers(res.data.users)
                })
            }else{
                setErrorText(res)
            }
        }
        
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            loginButtonClick()
        }
      };
    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
            <div >  
                <div className="card w-96 bg-base-100 shadow-xl flex-auto">
                    <div className="card-body flex flex-col items-center">
                        <h2 className="card-title">Login</h2>
                        <input className="input input-bordered input-primary w-full max-w-xs" onChange={(e) =>{setInitialInput(e.target.value)}}  onKeyPress={handleKeyPress} type="text" placeholder="Initial"></input>
                        <input className="input input-bordered input-primary w-full max-w-xs" onChange={(e)=>{setPasswordInput(e.target.value)}} onKeyPress={handleKeyPress} type="password" placeholder="Password"></input>
                        <button className="btn btn-primary w-64" onClick ={()=>{loginButtonClick()}}>Login</button>
                        <p className= "text-error">{errText}</p>
                    </div>
                </div>
            </div>

        </div>

        
    )
}

export default LoginPage