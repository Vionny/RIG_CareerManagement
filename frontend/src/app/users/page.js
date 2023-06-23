'use client'
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import "@/app/globals.css"
import ViewSnP from "@/pages/Staff/StaffPage"
import { UserProvider } from "@/components/UserContext"
import StaffPage from "@/pages/Staff/StaffPage"
import { useRouter } from "next/navigation"
import { isAuth } from "@/Middleware"

function allUser(){

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
                    <StaffPage/>
                </div>
            </div>
        </UserProvider>
    )    
}

export default allUser