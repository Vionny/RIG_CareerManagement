"use client"
import "@/app/globals.css"
import ManageCandidateDropdown from "@/components/Dropdown/ManageCandidateDropdown";
import {useEffect, useState} from 'react'

const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

const ManageCandidate = ()=>{

    const [loadRegist, setLoadRegist] = useState(false)
    const [regist,setRegist] = useState({})
    const [currSemester, setCurrSmt] = useState({})
    const [selectedCan,setSelectedCan]= useState()
    
    useEffect(()=>{
        console.log("h");
        setCurrSmt(sessionStorage.getItem('selectedSemester'));
        
                
        if(sessionStorage.getItem('selectedSemester')){
            console.log(currSemester);

            axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getCandidateList/'+sessionStorage.getItem('selectedSemester')).then((res) => {
                console.log(res.data)
                setRegist(res.data)  
                setLoadRegist(true)
            })
        }

    },[loadRegist])

    console.log(selectedCan);


    if(!loadRegist){
        return(
            <div className="bg-base-200 flex flex-col pl-10 pr-10 pt-5 w-full min-h-screen">       
            </div>
        )
    }
    else{

        return(
            <div className="bg-base-200 flex flex-col gap-2 pl-10 pr-10 py-3 w-full min-h-screen">
            <article className="prose base">
                <h2>Candidate Management</h2>
            </article>
            
            <ManageCandidateDropdown/>
            {/* table */}
            <div className="card w-full bg-base-100 ">
                    <div className="card-body p-3 w-full">
                        <div className="card-title justify-between">
                            <p className="card-title mb-1">Promotion Registrant</p>
                        </div>
                        
                        <div className="max-h-80 overflow-auto">
                            <table className="table table-compact w-full border ">
                                {/* head */}
                                <thead>
                                <tr>                                 
                                    <th className="sticky w-30 top-0 text-center">Initial</th>
                                    <th className="sticky w-48 top-0 text-center">Priority 1</th>
                                    <th className="sticky w-48 top-0 text-center">Priority 2</th>
                                    <th className="sticky w-48 top-0 text-center">Priority 3</th>
                                    <th className="whitespace-normal">Problem</th>
                                    <th>Comments</th>
                                    <th className="whitespace-normal sticky  top-0 text-center">OP Rank</th>
                                    <th className="whitespace-normal sticky top-0 text-center">AstDev Rank</th>
                                    <th className="whitespace-normal sticky  top-0 text-center">Subco Rank</th>
                                    <th className="whitespace-normal sticky  top-0 text-center">NA Staff Rank</th>
                                </tr>
                                </thead>
                                <tbody>

                                {regist.map((reg, index) => (
                                    <tr key={index}  className="clickable hover border-1" onClick={()=>{setSelectedCan(reg.initial)}}>
                        
                                        <td className="border">{reg.initial}</td>
                                        <td className="whitespace-normal w-48 border">{reg.priorityone}</td>
                                        <td className="whitespace-normal w-48 border">{reg.prioritytwo == null ? '-' : reg.prioritytwo}</td>
                                        <td className="whitespace-normal w-48 border">{reg.prioritythree == null ? '-' : reg.prioritythree}</td>
                              
                                    </tr>
                                ))}

                                </tbody>
                            </table>
                            </div>
                    </div>
                </div>

                


        </div>
    )
}


}


export default ManageCandidate
