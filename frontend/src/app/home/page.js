'use client'
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import  HomePage  from "@/pages/HomePage"
import "@/app/globals.css"
import { UserProvider } from "@/components/UserContext"
import { isAuth } from "@/Middleware"
import { useRouter } from "next/navigation"

function Home(){

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
                        <HomePage/>
                    </div>
                    
                </div>
            </UserProvider>
        )
    
}   
export default Home
