"use client"
import React, { useState } from "react"
import { handleLogin } from "../Controller/AuthController"
import { encryptPassword } from "../SLC/EncryptPassword"
import { connectToSOAP } from "../SLC/SOAP"
import { useRouter } from "next/navigation";
import HomePage from "./HomePage"


export function LoginPage () {

    var [initialInput, setInitialInput] =useState()
    var [passwordInput, setPasswordInput] = useState()
    var [errText, setErrorText] = useState()
    const router = useRouter()
    const loginButtonClick = (e) =>{
        var lower = initialInput.substring(0,2).toLowerCase()
        var gen = initialInput.substring(2,initialInput.length)
        var initial = lower + gen
        var res = connectToSOAP(initial,passwordInput)
        // console.log(res.object);
        if(res == 'Success'){
            return <HomePage/>
        }
    }

    const pushHome=() => {
        router.push("/homepage")
    }
 
    return (
        <div className="flex justify-center items-center h-max">
            <div >  
                <div className="card w-96 bg-base-100 shadow-xl flex-auto">
                    <div className="card-body flex flex-col items-center">
                        <h2 className="card-title">Login</h2>
                        <input className="input input-bordered input-primary w-full max-w-xs" onChange={(e) =>{setInitialInput(e.target.value)}} type="text" placeholder="Initial"></input>
                        <input className="input input-bordered input-primary w-full max-w-xs" onChange={(e)=>{setPasswordInput(e.target.value)}} type="password" placeholder="Password"></input>
                        <button className="btn btn-primary w-32" onClick ={pushHome}>Login</button>
                        <p value={errText}></p>
                    </div>
                </div>
            </div>

        </div>

        
    )
}
export default LoginPage