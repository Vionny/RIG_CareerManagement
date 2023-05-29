import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import InputCareerChoice from "@/pages/InputCareerChoice"

function InputCareer(){

    return(
        <div>
            <Navbar/>
            <div className="flex flex-row">
                <Sidebar/>
                <InputCareerChoice/>
            </div>
        </div>
    )
}

export default InputCareer