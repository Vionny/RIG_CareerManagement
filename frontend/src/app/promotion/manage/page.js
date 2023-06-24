'use client'
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import ManagePromotionPage from "@/pages/Promotion/ManagePromotionPage"     
import "@/app/globals.css"
import { UserProvider } from "@/components/UserContext"
import { useRouter } from "next/navigation"
import { isAuth } from "@/Middleware"
function RegisterPromotion(){

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
                <ManagePromotionPage/>
            </div>
        </div>
        </UserProvider>
    )
}

export default RegisterPromotion