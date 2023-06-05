import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { UserProvider } from "@/components/UserContext"
import InputCareerChoice from "@/pages/Career/InputCareerChoice"

function InputCareer(){

    return(
        <UserProvider>
            <div>
                <Navbar/>
                <div className="flex flex-row">
                    <Sidebar/>
                    <InputCareerChoice/>
                </div>
            </div>
        </UserProvider>
    )
}

export default InputCareer