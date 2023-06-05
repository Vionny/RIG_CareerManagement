import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import  HomePage  from "@/pages/HomePage"
import "@/app/globals.css"
import { UserProvider } from "@/components/UserContext"

function Home(){

    return (
        <UserProvider>
            <div>
                <Navbar/>
                <div className="flex flex-row">
                    <Sidebar/>
                    <HomePage/>
                </div>
                
            </div>
        </UserProvider>
    )


}   
export default Home
