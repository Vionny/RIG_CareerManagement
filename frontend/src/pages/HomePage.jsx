"use client"
import "@/app/globals.css"
import AnnouncementComponent from "@/components/Announcement";
import BATestTable from "@/components/Table/BATestTable";
import TestScheduleTable from "@/components/Table/TestScheduleTable";
import { useRouter } from 'next/navigation';

const HomePage = () => {
    
    const router = useRouter();

    return (
        <div className="bg-base-200 flex justify-center w-full min-h-screen">
            <div className="flex flex-row w-full">
                <div className="flex flex-col w-3/5 mr-10 ml-10">
                    <BATestTable/>
                    <TestScheduleTable/>
                </div>
                <div className="w-2/5 m-5 ml-10">
                    <AnnouncementComponent/>
                </div>
            </div>
                 
        </div>
    )



}   
export default HomePage
