'use client'
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import "@/app/globals.css"
import { UserProvider } from "@/components/UserContext"
import { useRouter } from "next/navigation"
import { isAuth } from "@/Middleware"
import AssistantDetail from "@/pages/Assistant/AssistantDetail"

function assistantDetail({params}){

    console.log(params);
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
                    <AssistantDetail id={params.id}/>
                </div>
            </div>
        </UserProvider>
    )
}
}

export default assistantDetail