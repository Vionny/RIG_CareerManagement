'use client'
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import "@/app/globals.css"
import { UserProvider } from "@/components/UserContext"
import { useRouter } from "next/navigation"
import { isAuth } from "@/Middleware"
import AssistantPage from "@/pages/Assistant/AssistantPage"

function viewAllAssistant(){

    const router = useRouter();

    if(!isAuth()){
        router.push('/')
    }else{
    return(
        <UserProvider>
            <div >
                <Navbar/>
                <div className="flex flex-row">
                    <Sidebar/>
                    <AssistantPage/>
                </div>
            </div>
        </UserProvider>
    )
}
}

export default viewAllAssistant