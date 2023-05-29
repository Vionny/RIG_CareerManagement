import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import  HomePage  from "@/pages/HomePage"

function Home(){

    return (
        <div>
            <Navbar/>
            <div className="flex flex-row">
                <Sidebar/>
                <HomePage/>
            </div>
            
        </div>
    )


}   
export default Home
