import { handleLogin } from "../Controller/AuthController"
import { encryptPassword } from "../SLC/EncryptPassword"
import { connectToSOAP } from "../SLC/SOAP"


export const LoginPage = () =>{

    let initialInput 
    let passwordInput
    let errText

    const initialChange = (e)=>{
        initialInput = e.target.value
    }

    const passwordChange= (e) =>{
        passwordInput = e.target.value
    }

    const loginButtonClick = (e) =>{
        connectToSOAP(initialInput,passwordInput)
    }

    return (
        <div>
            <input onChange={initialChange} type="text" placeholder="Initial"></input>
            <input onChange={passwordChange} type="password" placeholder="Password"></input>
            <button onClick ={loginButtonClick}>Login</button>
            <p value={errText}></p>
        </div>
    )
}