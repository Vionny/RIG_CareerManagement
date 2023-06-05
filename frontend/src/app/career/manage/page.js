import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import {UserProvider } from "@/components/UserContext"
import ManageCareerChoice from "@/pages/Career/ManageCareerChoice"


function ChoiceManage(){

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
