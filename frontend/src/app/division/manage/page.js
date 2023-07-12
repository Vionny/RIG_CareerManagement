'use client'
import { isAuth } from "@/Middleware";
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import {UserProvider } from "@/components/UserContext"
import ManageDivisionPage from "@/pages/Division/ManageDivisionPage"
import { useRouter } from "next/navigation";

function ManageDivisionShow(){
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
                    <ManageDivisionPage/>
                </div>
                
            </div>
        </UserProvider>
    )


}   
export default ManageDivisionShow
