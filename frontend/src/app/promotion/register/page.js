import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import RegisterPromotionPage from "@/pages/Promotion/RegisterPromotionPage"

function RegisterPromotion(){


    return (
        <div>
            <Navbar/>
            <div className="flex flex-row">
                <Sidebar/>
                <RegisterPromotionPage/>
            </div>
        </div>
    )
}

export default RegisterPromotion