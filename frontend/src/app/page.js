'use client'

import { isAuth } from "@/Middleware";
import LoginPage from "@/pages/LoginPage";
import { useRouter } from "next/navigation";

function Login() {

  const router = useRouter();

  if(isAuth()){
      router.push('/home')
  }else
    return (
      <div>
          <LoginPage/>

      </div>
    )
  }
  
  export default Login;