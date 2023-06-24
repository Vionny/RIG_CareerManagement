'use client'
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import "@/app/globals.css"
import ViewSnP from "@/pages/Semester/ViewSnP"
import { UserProvider } from "@/components/UserContext"
import { useRouter } from "next/navigation"
import { isAuth } from "@/Middleware"

function viewSemesterNPeriod(){

    const router = useRouter();

    if(!isAuth()){
        router.push('/')
    }else
    return(
        <UserProvider>
            <div >
                <Navbar/>
                <div className="flex flex-row">
                    <Sidebar/>
                    <ViewSnP/>
                </div>
            </div>
        </UserProvider>
    )    
}

export default viewSemesterNPeriod