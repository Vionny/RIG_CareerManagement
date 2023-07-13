"use client"
import "@/app/globals.css"
import axios from 'axios';
import "@/components/Modals/Edit/EditCareerModal.jsx"
import React, { useEffect, useState } from 'react';
import EditDivisionModal from "@/components/Modals/Edit/EditDivisionModal.jsx";
import SimpleInformationModal from "./Modals/Information/SimpleInformationModal";

const ManageDivisionTable = ({division, selectId}) => {
    const [selectedDiv,setSelectedDiv]= useState()
    const [showEditModal,setShowEditModal] = useState(false)
    

    const closeModal = () => {
        setShowEditModal(false)
    }
    
    // console.log(selectedDivision);
    

    return(
        <div className="max-h-80 overflow-auto">

            {showEditModal && (
                    <EditDivisionModal 
                        closeModal={closeModal}
                        divId = {selectedDiv.divisionid}
                        divName={selectedDiv.divisionname}
                        divDesc={selectedDiv.divisiondescription}
                        />
            )}

            <table className="table table-compact w-full">
                <thead>
                    <tr>
                    <th className="sticky w-30 top-0 text-center">Division Name</th>
                    <th className="sticky top-0 w-30   text-center">Division Description</th>
                    <th className="sticky top-0 text-center">Action</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {division.map((divItem, index) => (
                    <tr className="clickable" onClick={()=>{selectId(divItem.divisionid)}} key={index}>
                        <td className="text-center w-64">
                            <div className="whitespace-normal">{divItem.divisionname}</div>
                        </td>
                        <td className="text-center">
                            <div className="whitespace-normal">{divItem.divisiondescription} </div>        
                        </td>
                        
                        <td className="text-center w-32">
                            <button className="btn btn-info btn-sm btn-outline font-bold  border-blue-400"
                            onClick={()=>{
                                console.log(divItem)
                                setSelectedDiv(divItem);
                                setShowEditModal(true);
                              }}
                            >Edit</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>

        </div>

    )
}

export default ManageDivisionTable