'use client'
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import RegisterPromotionPage from "@/pages/Promotion/RegisterPromotionPage"     
import "@/app/globals.css"
import { UserProvider } from "@/components/UserContext"
import { isAuth } from "@/Middleware"
import { useRouter } from "next/navigation"
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
                <RegisterPromotionPage/>
            </div>
        </div>
        </UserProvider>
    )
}

export default RegisterPromotion