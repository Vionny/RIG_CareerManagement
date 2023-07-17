"use client"
import "@/app/globals.css"
import BATestInputComponent from "@/components/BATestInputComponent"
import InterviewTestScheduleInput from "@/components/InterviewTestScheduleInput"
const axios = require("axios")

const ManagePromotionSchedulePage = ()=>{

    return (
        <div className="bg-base-200 flex flex-col gap-2 pl-10 pr-10 py-3 w-full min-h-screen">
            <BATestInputComponent/>
            <InterviewTestScheduleInput/>
        </div>

    )
}

export default ManagePromotionSchedulePage;