"use client"
import "@/app/globals.css"
import ManageCandidateDropdown from "@/components/Dropdown/ManageCandidateDropdown";
import SimpleInformationModal from "@/components/Modals/Information/SimpleInformationModal";
import AssistantDetailCompact from "@/components/AssistantDetailCompact";
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
        updatedRegist[index][fieldName] = value
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
                        <div className="card-title justify-between w-full mx-5 mt-5">
                            <p className="card-title text-2xl">Promotion Registrant</p>
                            <button className="btn btn-info text-sm mr-10"  onClick={() => handleEditClick(regist)}>Update</button>
                        </div>
                        <div className="flex justify-center space-x-4">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-red-500 mr-2"></div>
                                <span className="text-red-500">Rejected (x)</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-gray-500 mr-2"></div>
                                <span className="text-gray-500">Not Candidate (-)</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-amber-400 mr-2"></div>
                                <span className="text-amber-400">Tentative (o)</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-400 mr-2"></div>
                                <span className="text-green-400">Accepted (0+)</span>
                            </div>
                        </div>

                        <div className="max-h-96 h-96 p-5 ">
                            <table className="table table-compact w-full overflow-auto  border text-center">
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

                                {(regist.map((reg, index) => {
                                    return <tr key={index}  className="clickable hover border-1" onClick={()=>{setSelectedCan(reg.initial)}}>
                        
                                        <td className="border">{reg.initial}</td>
                                        <td className="whitespace-normal w-48 border">{reg.priorityone == null ? '-' : reg.priorityone}</td>
                                        <td className="whitespace-normal w-48 border">{reg.prioritytwo == null ? '-' : reg.prioritytwo}</td>
                                        <td className="whitespace-normal w-48 border">{reg.prioritythree == null ? '-' : reg.prioritythree}</td>
                                        <td className="whitespace-normal w-48 border">{reg.commentamount ? reg.commentamount : '-'}</td>
                                        <td>
                                        <input
                                            type="text"
                                            maxLength={1}
                                            placeholder="Type here"
                                            value={reg.opofficer ? reg.opofficer : ''}
                                            className={`input input-bordered w-12 text-center max-w-xs ${
                                            reg.opofficer === 'x' ? 'bg-red-300' :
                                            reg.opofficer === '-' ? 'bg-gray-300' :
                                            reg.opofficer === 'o' ? 'bg-yellow-200' :
                                            reg.opofficer > 0 ? 'bg-green-300' : ''
                                            }`}
                                            onChange={(e) => handleInputChange(e, index, 'opofficer')}
                                        />
                                        </td>
                                        <td>
                                        <input
                                            type="text"
                                            maxLength={1}
                                            placeholder="Type here"
                                            value={reg.resmanoff ? reg.resmanoff : ''}
                                            className={`input input-bordered w-12 text-center max-w-xs ${
                                            reg.resmanoff === 'x' ? 'bg-red-300' :
                                            reg.resmanoff === '-' ? 'bg-gray-300' :
                                            reg.resmanoff === 'o' ? 'bg-yellow-200' :
                                            reg.resmanoff > 0 ? 'bg-green-300' : ''
                                            }`}
                                            onChange={(e) => handleInputChange(e, index, 'resmanoff')}
                                        />
                                        </td>
                                        <td>
                                        <input
                                            type="text"
                                            maxLength={1}
                                            placeholder="Type here"
                                            value={reg.dbstaff ? reg.dbstaff : ''}
                                            className={`input input-bordered w-12 text-center max-w-xs ${
                                            reg.dbstaff === 'x' ? 'bg-red-300' :
                                            reg.dbstaff === '-' ? 'bg-gray-300' :
                                            reg.dbstaff === 'o' ? 'bg-yellow-200' :
                                            reg.dbstaff > 0 ? 'bg-green-300' : ''
                                            }`}
                                            onChange={(e) => handleInputChange(e, index, 'dbstaff')}
                                        />
                                        </td>
                                        <td>
                                        <input
                                            type="text"
                                            maxLength={1}
                                            placeholder="Type here"
                                            value={reg.nastaff ? reg.nastaff : ''}
                                            className={`input input-bordered w-12 text-center max-w-xs ${
                                            reg.nastaff === 'x' ? 'bg-red-300' :
                                            reg.nastaff === '-' ? 'bg-gray-300' :
                                            reg.nastaff === 'o' ? 'bg-yellow-200' :
                                            reg.nastaff > 0 ? 'bg-green-300' : ''
                                            }`}
                                            onChange={(e) => handleInputChange(e, index, 'nastaff')}
                                        />
                                        </td>
                                        <td>
                                        <input
                                            type="text"
                                            maxLength={1}
                                            placeholder="Type here"
                                            value={reg.naofficer ? reg.naofficer : ''}
                                            className={`input input-bordered w-12 text-center max-w-xs ${
                                            reg.naofficer === 'x' ? 'bg-red-300' :
                                            reg.naofficer === '-' ? 'bg-gray-300' :
                                            reg.naofficer === 'o' ? 'bg-yellow-200' :
                                            reg.naofficer > 0 ? 'bg-green-300' : ''
                                            }`}
                                            onChange={(e) => handleInputChange(e, index, 'naofficer')}
                                        />
                                        </td>
                                        <td>
                                        <input
                                            type="text"
                                            maxLength={1}
                                            placeholder="Type here"
                                            value={reg.rndstaff ? reg.rndstaff : ''}
                                            className={`input input-bordered w-12 text-center max-w-xs ${
                                            reg.rndstaff === 'x' ? 'bg-red-300' :
                                            reg.rndstaff === '-' ? 'bg-gray-300' :
                                            reg.rndstaff === 'o' ? 'bg-yellow-200' :
                                            reg.rndstaff > 0 ? 'bg-green-300' : ''
                                            }`}
                                            onChange={(e) => handleInputChange(e, index, 'rndstaff')}
                                        />
                                        </td>
                                        <td>
                                        <input
                                            type="text"
                                            maxLength={1}
                                            placeholder="Type here"
                                            value={reg.rndofficer ? reg.rndofficer : ''}
                                            className={`input input-bordered w-12 text-center max-w-xs ${
                                            reg.rndofficer === 'x' ? 'bg-red-300' :
                                            reg.rndofficer === '-' ? 'bg-gray-300' :
                                            reg.rndofficer === 'o' ? 'bg-yellow-200' :
                                            reg.rndofficer > 0 ? 'bg-green-300' : ''
                                            }`}
                                            onChange={(e) => handleInputChange(e, index, 'rndofficer')}
                                        />
                                        </td>
                                        <td>
                                        <input
                                            type="text"
                                            maxLength={1}
                                            placeholder="Type here"
                                            value={reg.subco ? reg.subco : ''}
                                            className={`input input-bordered w-12 text-center max-w-xs ${
                                            reg.subco === 'x' ? 'bg-red-300' :
                                            reg.subco === '-' ? 'bg-gray-300' :
                                            reg.subco === 'o' ? 'bg-yellow-200' :
                                            reg.subco > 0 ? 'bg-green-300' : ''
                                            }`}
                                            onChange={(e) => handleInputChange(e, index, 'subco')}
                                        />
                                        </td>
                                        <td>
                                        <input
                                            type="text"
                                            maxLength={1}
                                            placeholder="Type here"
                                            value={reg.subdev ? reg.subdev : ''}
                                            className={`input input-bordered w-12 text-center max-w-xs ${
                                            reg.subdev === 'x' ? 'bg-red-300' :
                                            reg.subdev === '-' ? 'bg-gray-300' :
                                            reg.subdev === 'o' ? 'bg-yellow-200' :
                                            reg.subdev > 0 ? 'bg-green-300' : ''
                                            }`}
                                            onChange={(e) => handleInputChange(e, index, 'subdev')}
                                        />
                                        </td>
                                        <td>
                                        <input
                                            type="text"
                                            maxLength={1}
                                            placeholder="Type here"
                                            value={reg.astdev ? reg.astdev : ''}
                                            className={`input input-bordered w-12 text-center max-w-xs ${
                                            reg.astdev === 'x' ? 'bg-red-300' :
                                            reg.astdev === '-' ? 'bg-gray-300' :
                                            reg.astdev === 'o' ? 'bg-yellow-200' :
                                            reg.astdev > 0 ? 'bg-green-300' : ''
                                            }`}
                                            onChange={(e) => handleInputChange(e, index, 'astdev')}
                                        />
                                        </td>

                                        
                                    </tr>
                                }))}
                                </tbody>
                            </table>
                            
                            </div>
                    </div>
                </div>


                {selectedCan ?
              
                    <AssistantDetailCompact id={selectedCan}/>
                    :
                    <div></div>
                }
                


        </div>
    )
}


}


export default ManageCandidate
