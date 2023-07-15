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
                        
                        <div className="max-h-96 h-96 overflow-auto p-5 ">
                            <table className="table table-compact w-full border text-center">
                                {/* head */}
                                <thead>
                                <tr>                                 
                                    <th className="sticky w-30 top-0 text-center">Initial</th>
                                    <th className="sticky w-48 top-0 text-center">Priority 1</th>
                                    <th className="sticky w-48 top-0 text-center">Priority 2</th>
                                    <th className="sticky w-48 top-0 text-center">Priority 3</th>
                                    <th className="sticky w-48 top-0 text-center">Comments</th>
                                    <th className="whitespace-normal sticky  top-0 text-center">OP</th>
                                    <th className="whitespace-normal sticky  top-0 text-center">Resman</th>
                                    <th className="whitespace-normal sticky  top-0 text-center">DB Staff</th>
                                    <th className="whitespace-normal sticky  top-0 text-center">NA Staff</th>
                                    <th className="whitespace-normal sticky  top-0 text-center">NA Officer</th>
                                    <th className="whitespace-normal sticky  top-0 text-center">RnD Staff</th>
                                    <th className="whitespace-normal sticky  top-0 text-center">RnD Officer</th>
                                    <th className="whitespace-normal sticky  top-0 text-center">Subco</th>
                                    <th className="whitespace-normal sticky  top-0 text-center">SubDev</th>
                                    <th className="whitespace-normal sticky  top-0 text-center">AstDev</th>
                                    <th className="whitespace-normal sticky  top-0 text-center">Edit</th>
                                </tr>
                                </thead>
                                <tbody>

                                {regist.map((reg, index) => (
                                    <tr key={index}  className="clickable hover border-1" onClick={()=>{setSelectedCan(reg.initial)}}>
                                        <td className="whitespace-normal w-48 border">{reg.initial}</td>
                                        <td className="whitespace-normal w-48 border">{reg.priorityone ?reg.priorityone : '-'}</td>
                                        <td className="whitespace-normal w-48 border">{reg.prioritytwo == null ? '-' : reg.prioritytwo}</td>
                                        <td className="whitespace-normal w-48 border">{reg.prioritythree == null ? '-' : reg.prioritythree}</td>
                                        <td className="whitespace-normal w-48 border">{reg.commentamount ? reg.commentamount : 0}</td>
                                        <td className="whitespace-normal w-48 border"><input type="text" value = {reg.opofficer ? reg.opofficer : 0} className="input input-bordered w-full max-w-xs" /></td>
                                        <td className="whitespace-normal w-48 border"><input type="text" value = {reg.resmanoff ? reg.resmanoff : 0} className="input input-bordered w-full max-w-xs" /></td>
                                        <td className="whitespace-normal w-48 border"><input type="text" value = {reg.dbstaff ? reg.dbstaff : 0} className="input input-bordered w-full max-w-xs" /></td>
                                        <td className="whitespace-normal w-48 border"><input type="text" value = {reg.nastaff ? reg.nastaff : 0} className="input input-bordered w-full max-w-xs" /></td>
                                        <td className="whitespace-normal w-48 border"><input type="text" value = {reg.naofficer ? reg.naofficer : 0} className="input input-bordered w-full max-w-xs" /></td>
                                        <td className="whitespace-normal w-48 border"><input type="text" value = {reg.rndstaff ? reg.rndstaff : 0} className="input input-bordered w-full max-w-xs" /></td>
                                        <td className="whitespace-normal w-48 border"><input type="text" value = {reg.rndofficer ? reg.rndofficer :0} className="input input-bordered w-full max-w-xs" /></td>
                                        <td className="whitespace-normal w-48 border"><input type="text" value = {reg.subco ? reg.subco : 0} className="input input-bordered w-full max-w-xs" /></td>
                                        <td className="whitespace-normal w-48 border"><input type="text" value = {reg.subdev ? reg.subdev : 0} className="input input-bordered w-full max-w-xs" /></td>
                                        <td className="whitespace-normal w-48 border"><input type="text" value = {reg.astdev ? reg.astdev : 0} className="input input-bordered w-full max-w-xs" /></td>
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
