'use client'
import { isAuth } from "@/Middleware";
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import {UserProvider } from "@/components/UserContext"
import ManageCareerChoice from "@/pages/Career/ManageCareerChoice"
import { useRouter } from "next/router";


function ChoiceManage(){


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
                    <ManageCareerChoice/>
                </div>
                
            </div>
        </UserProvider>
    )


}   
export default ChoiceManage
