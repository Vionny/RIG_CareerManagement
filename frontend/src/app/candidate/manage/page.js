import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { UserProvider } from "@/components/UserContext"
import ManageCandidate from "@/pages/Candidate/ManageCandidate"


function ManageCandidatePage(){

    return(
        <UserProvider>
            <div>
                <Navbar/>
                <div className="flex flex-row">
                    <Sidebar/>
                    <ManageCandidate/>
                </div>
            </div>
        </UserProvider>
    )
}

export default ManageCandidatePage