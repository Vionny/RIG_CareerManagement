"use client"
import "@/app/globals.css"
import ManageCandidateDropdown from "@/components/Dropdown/ManageCandidateDropdown";
import SimpleInformationModal from "@/components/Modals/Information/SimpleInformationModal";
import {useEffect, useState} from 'react'

const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

const ManageCandidate = ()=>{
    const [sortColumn, setSortColumn] = useState(""); // Keeps track of the currently sorted column
    const [sortOrder, setSortOrder] = useState(""); // Keeps track of the sorting order (asc or desc)
    
    const [loadRegist, setLoadRegist] = useState(false)
    const [regist,setRegist] = useState({})
    const [currSemester, setCurrSmt] = useState({})
    const [selectedCan,setSelectedCan]= useState()
    const [showEdit , setShowEdit] = useState()
    const [showInfoModal, setShowInfoModal] = useState()

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
    const handleInputChange = (e, index, fieldName) => {
        const { value } = e.target;
      
        const updatedRegist = [...regist];
        updatedRegist[index][fieldName] = parseInt(value);
        setRegist(updatedRegist);
      
    };
      
      
    const handleEditClick = (reg) => {
        
        console.log(regist)

        const data = {
            data : regist
        }

        axios.patch(process.env.NEXT_PUBLIC_BACKEND_URL+'/updateCandidateRanking', data)
          .then(response => {
            if(response.data == 'OK'){
                setShowInfoModal(true)
            }
          })
          .catch(error => {
            // Handle the error if needed
            console.error('Error updating data:', error);
          });
      };
      
    const refreshPage = ()=>{
        
        setShowInfoModal(false)
        window.location.reload()
    }
    
    const handleSort = (column) => {
        
        if (sortColumn === column) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            
        setSortColumn(column);
        setSortOrder("asc");
        }
    
        const sortedRegist = [...regist];
        sortedRegist.sort((a, b) => {
        if (a[column] < b[column]) return sortOrder === "asc" ? -1 : 1;
        if (a[column] > b[column]) return sortOrder === "asc" ? 1 : -1;
        return 0;
        });
    
        // Update the regist array with the sorted data
        setRegist(sortedRegist);
    };
    


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
            {showInfoModal && (<SimpleInformationModal
                title="Successful"
                message = "You have successfully updated your candidate ranking !"
                onConfirm = {refreshPage}
            />)}
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
                                    <th className="sticky w-30 top-0 text-center" onClick={() => handleSort("initial")}>Initial
                                    {sortColumn === "initial" && (
                                        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                    )}</th>
                                    <th className="sticky w-48 top-0 text-center" onClick={() => handleSort("priorityone")}>Priority 1
                                    {sortColumn === "priorityone" && (
                                        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                    )}</th>
                                    <th className="sticky w-48 top-0 text-center" onClick={() => handleSort("prioritytwo")}>Priority 2
                                    {sortColumn === "prioritytwo" && (
                                        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                    )}</th>
                                    <th className="sticky w-48 top-0 text-center" onClick={() => handleSort("prioritythree")}>Priority 3
                                    {sortColumn === "prioritythree" && (
                                        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                    )}</th>
                                    <th className="sticky w-48 top-0 text-center" onClick={() => handleSort("commentamount")}>Comments
                                    {sortColumn === "commentamount" && (
                                        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                    )}</th>
                                    <th className="whitespace-normal sticky  top-0 text-center" onClick={() => handleSort("opofficer")}>OP
                                    {sortColumn === "opofficer" && (
                                        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                    )}</th>
                                    <th className="whitespace-normal sticky  top-0 text-center" onClick={() => handleSort("resmanoff")}>Resman
                                    {sortColumn === "resmanoff" && (
                                        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                    )}</th>
                                    <th className="whitespace-normal sticky  top-0 text-center" onClick={() => handleSort("dbstaff")}>DB Staff
                                    {sortColumn === "dbstaff" && (
                                        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                    )}</th>
                                    <th className="whitespace-normal sticky  top-0 text-center" onClick={() => handleSort("nastaff")}>NA Staff
                                    {sortColumn === "nastaff" && (
                                        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                    )}</th>
                                    <th className="whitespace-normal sticky  top-0 text-center" onClick={() => handleSort("naofficer")}>NA Officer
                                    {sortColumn === "naofficer" && (
                                        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                    )}</th>
                                    <th className="whitespace-normal sticky  top-0 text-center" onClick={() => handleSort("rndstaff")}>RnD Staff
                                    {sortColumn === "rndstaff" && (
                                        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                    )}</th>
                                    <th className="whitespace-normal sticky  top-0 text-center" onClick={() => handleSort("rndofficer")}>RnD Officer
                                    {sortColumn === "rndofficer" && (
                                        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                    )}</th>
                                    <th className="whitespace-normal sticky  top-0 text-center" onClick={() => handleSort("subco")}>Subco
                                    {sortColumn === "subco" && (
                                        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                    )}</th>
                                    <th className="whitespace-normal sticky  top-0 text-center" onClick={() => handleSort("subdev")}>SubDev
                                    {sortColumn === "subdev" && (
                                        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                    )}</th>
                                    <th className="whitespace-normal sticky  top-0 text-center" onClick={() => handleSort("astdev")}>AstDev
                                    {sortColumn === "astdev" && (
                                        <span>{sortOrder === "asc" ? "▲" : "▼"}</span>
                                    )}</th>
                                </tr>
                                </thead>
                                <tbody>

                                {regist.map((reg, index) => {
                                    return <tr key={index}  className="clickable hover border-1" onClick={()=>{setSelectedCan(reg.initial)}}>
                        
                                        <td className="border">{reg.initial}</td>
                                        <td className="whitespace-normal w-48 border">{reg.priorityone == null ? '-' : reg.prioritytwo}</td>
                                        <td className="whitespace-normal w-48 border">{reg.prioritytwo == null ? '-' : reg.prioritytwo}</td>
                                        <td className="whitespace-normal w-48 border">{reg.prioritythree == null ? '-' : reg.prioritythree}</td>
                                        <td className="whitespace-normal w-48 border">{reg.commentamount ? reg.commentamount : 0}</td>
                                        <td><input type="text" placeholder="Type here" value ={reg.opofficer ? reg.opofficer : 0} className={`input input-bordered w-12 text-center max-w-xs ${reg.opofficer ==0 ? 'bg-red-300':'bg-green-300'}`} onChange={(e) => handleInputChange(e, index, 'opofficer')} /></td>
                                        <td><input type="text" placeholder="Type here" value={reg.resmanoff ? reg.resmanoff : 0} className={`input input-bordered w-12 text-center max-w-xs ${reg.resmanoff ==0 ? 'bg-red-300':'bg-green-300'}`} onChange={(e) => handleInputChange(e, index, 'resmanoff')} /></td>
                                        <td><input type="text" placeholder="Type here" value={reg.dbstaff ? reg.dbstaff : 0} className={`input input-bordered w-12 text-center max-w-xs ${reg.dbstaff ==0 ? 'bg-red-300':'bg-green-300'}`} onChange={(e) => handleInputChange(e, index, 'dbstaff')} /></td>
                                        <td><input type="text" placeholder="Type here" value={reg.nastaff ? reg.nastaff : 0} className={`input input-bordered w-12 text-center max-w-xs ${reg.nastaff ==0 ? 'bg-red-300':'bg-green-300'}`} onChange={(e) => handleInputChange(e, index, 'nastaff')} /></td>
                                        <td><input type="text" placeholder="Type here" value={reg.naofficer ? reg.naofficer : 0} className={`input input-bordered w-12 text-center max-w-xs ${reg.naofficer ==0 ? 'bg-red-300':'bg-green-300'}`} onChange={(e) => handleInputChange(e, index, 'naofficer')} /></td>
                                        <td><input type="text" placeholder="Type here" value={reg.rndstaff ? reg.rndstaff : 0} className={`input input-bordered w-12 text-center max-w-xs ${reg.rndstaff ==0 ? 'bg-red-300':'bg-green-300'}`} onChange={(e) => handleInputChange(e, index, 'rndstaff')} /></td>
                                        <td><input type="text" placeholder="Type here" value={reg.rndofficer ? reg.rndofficer : 0} className={`input input-bordered w-12 text-center max-w-xs ${reg.rndofficer ==0 ? 'bg-red-300':'bg-green-300'}`} onChange={(e) => handleInputChange(e, index, 'rndofficer')} /></td>
                                        <td><input type="text" placeholder="Type here" value={reg.subco ? reg.subco : 0} className={`input input-bordered w-12 text-center max-w-xs ${reg.subco ==0 ? 'bg-red-300':'bg-green-300'}`} onChange={(e) => handleInputChange(e, index, 'subco')} /></td>
                                        <td><input type="text" placeholder="Type here" value={reg.subdev ? reg.subdev : 0} className={`input input-bordered w-12 text-center max-w-xs ${reg.subdev ==0 ? 'bg-red-300':'bg-green-300'}`} onChange={(e) => handleInputChange(e, index, 'subdev')} /></td>
                                        <td><input type="text" placeholder="Type here" value={reg.astdev ? reg.astdev : 0} className={`input input-bordered w-12 text-center max-w-xs ${reg.astdev ==0 ? 'bg-red-300':'bg-green-300'}`} onChange={(e) => handleInputChange(e, index, 'astdev')} /></td>
                                        
                                    </tr>
                                })}
                                </tbody>
                            </table>
                            <button className="btn btn-outline btn-info m-2 text-sm" onClick={() => handleEditClick(regist)}>Edit All</button>
                            </div>
                    </div>
                </div>

                


        </div>
    )
}


}


export default ManageCandidate
