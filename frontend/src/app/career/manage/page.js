import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import ManageCareerChoice from "@/pages/Career/ManageCareerChoice"


function ChoiceManage(){

    return (
        <div>
            <Navbar/>
            <div className="flex flex-row">
                <Sidebar/>
                <ManageCareerChoice/>
            </div>
            
        </div>
    )


}   
export default ChoiceManage
