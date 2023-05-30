"use client"

import "../app/globals.css"
import React, { useState } from "react"
const axios = require("axios")

import { useRouter } from "next/navigation"
import { connectToSOAP } from "@/SLC/SOAP"
const LoginPage = () => {
    const router = useRouter();
    var [initialInput, setInitialInput] =useState()
    var [passwordInput, setPasswordInput] = useState()
    var [errText, setErrorText] = useState()
    const loginButtonClick = async (e) =>{
        var lower = initialInput.substring(0,2).toLowerCase()
        var gen = initialInput.substring(2,initialInput.length)
        var initial = lower + gen
        var res = await connectToSOAP(initial,passwordInput)
        console.log(res)
        if(res == 'Success'){
            console.log('Success')
            router.push('/home')
            // axios.get(process.env.NEXT_PUBLIC_BACKEND_URL).then((res) => {
            //     console.log(res.data.users)
            //     // setUsers(res.data.users)
            // })
        }

        // soap3()
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200">
            <div >  
                <div className="card w-96 bg-base-100 shadow-xl flex-auto">
                    <div className="card-body flex flex-col items-center">
                        <h2 className="card-title">Login</h2>
                        <input className="input input-bordered input-primary w-full max-w-xs" onChange={(e) =>{setInitialInput(e.target.value)}} type="text" placeholder="Initial"></input>
                        <input className="input input-bordered input-primary w-full max-w-xs" onChange={(e)=>{setPasswordInput(e.target.value)}} type="password" placeholder="Password"></input>
                        <button className="btn btn-primary w-64" onClick ={()=>{loginButtonClick()}}>Login</button>
                        <p value={errText}></p>
                    </div>
                </div>
            </div>

        </div>

        
    )
}

export default LoginPage