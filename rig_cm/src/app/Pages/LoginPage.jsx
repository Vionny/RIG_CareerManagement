"use client"
import React, { useState } from "react"
import { handleLogin } from "../Controller/AuthController"
import { encryptPassword } from "../SLC/EncryptPassword"
import { connectToSOAP } from "../SLC/SOAP"
import { useRouter } from 'next/navigation';
import HomePage from "./HomePage"

export function LoginPage () {

    var [initialInput, setInitialInput] =useState()
    var [passwordInput, setPasswordInput] = useState()
    var [errText, setErrorText] = useState()
    const loginButtonClick = (e) =>{
        var lower = initialInput.substring(0,2).toLowerCase()
        var gen = initialInput.substring(2,initialInput.length)
        var initial = lower + gen
        var res = connectToSOAP(initial,passwordInput)
        if(res == 'Success'){
            console.log('Success')
            var router = useRouter
            router.push('/src/app/Pages/HomePage.jsx')
        }
    }

    return (
        <div>
            <input onChange={(e) =>{setInitialInput(e.target.value)}} type="text" placeholder="Initial"></input>
            <input onChange={(e)=>{setPasswordInput(e.target.value)}} type="password" placeholder="Password"></input>
            <button onClick ={loginButtonClick}>Login</button>
            <p value={errText}></p>
        </div>
    )
}
export default LoginPage