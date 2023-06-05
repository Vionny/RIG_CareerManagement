import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import RegisterPromotionPage from "@/pages/Promotion/RegisterPromotionPage"     
import "@/app/globals.css"
import { UserProvider } from "@/components/UserContext"
function RegisterPromotion(){


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