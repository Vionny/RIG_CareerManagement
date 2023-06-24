'use client'
import { isAuth } from "@/Middleware";
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import {UserProvider } from "@/components/UserContext"
import DivisionPage from "@/pages/Division/DivisionPage"
import { useRouter } from "next/navigation";

function DivisionShow(){
    const router = useRouter();

    if(!isAuth()){
        router.push('/')
    }else
    return (
        <UserProvider>
            <div>
                <Navbar/>
                <div className="flex flex-row">
                    <Sidebar/>
                    <DivisionPage/>
                </div>
                
            </div>
        </UserProvider>
    )


}   
export default DivisionShow
