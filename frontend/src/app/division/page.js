import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import {UserProvider } from "@/components/UserContext"
import DivisionPage from "@/pages/Division/DivisionPage"

function DivisionShow(){

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
