'use client'
import { isAuth } from "@/Middleware";
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { UserProvider } from "@/components/UserContext"
import InputCareerChoice from "@/pages/Career/InputCareerChoice"
import { useRouter } from "next/navigation";

function InputCareer(){


    const router = useRouter();

    if(!isAuth()){
        router.push('/')
    }else
    return(
        <UserProvider>
            <div>
                <Navbar/>
                <div className="flex flex-row">
                    <Sidebar/>
                    <InputCareerChoice/>
                </div>
            </div>
        </UserProvider>
    )
}

export default InputCareer