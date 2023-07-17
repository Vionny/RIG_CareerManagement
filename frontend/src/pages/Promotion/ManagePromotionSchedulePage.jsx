"use client"
import "@/app/globals.css"
import BATestInputComponent from "@/components/BATestInputComponent"
import TestScheduleTable from "@/components/Table/TestScheduleTable"
const axios = require("axios")

const ManagePromotionSchedulePage = ()=>{

    return (
        <div className="bg-base-200 flex flex-col gap-2 pl-10 pr-10 py-3 w-full min-h-screen">
            <BATestInputComponent/>
            <TestScheduleTable/>
        </div>

    )
}

export default ManagePromotionSchedulePage;