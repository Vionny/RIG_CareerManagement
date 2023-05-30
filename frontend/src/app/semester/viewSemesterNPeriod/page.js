
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import "@/app/globals.css"
import ViewSnP from "@/pages/Semester/ViewSnP"

function viewSemesterNPeriod(){

    return(
        <div>
            <Navbar/>
            <div className="flex flex-row">
                <Sidebar/>
                <ViewSnP/>
            </div>
        </div>
    )    
}

export default viewSemesterNPeriod