"use client"
import "@/app/globals.css"
import axios from 'axios';
import "@/components/Modals/Edit/EditCareerModal.jsx"
import React, { useEffect, useState } from 'react';
import EditRoleModal from "@/components/Modals/Edit/EditRoleModal.jsx";
import SimpleInformationModal from "./Modals/Information/SimpleInformationModal";

const ManageRoleTable = ({selectedDiv}) => {

    const [roles,setRoles]= useState()
    const [selectedRole,setSelectedRole]= useState()
    const [showEditModal,setShowEditModal] = useState(false)
    

    const closeModal = () => {
        setShowEditModal(false)
    }


    console.log(roles);

    useEffect(() =>{
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/getRoleByDivision/' + selectedDiv)
            .then((res) => {
                setRoles(res.data)
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
      }, [selectedDiv])
    
    if(roles == undefined) return( <div></div> )
    else
    return(
        <div className="max-h-80 overflow-auto">

            {showEditModal && (
                <EditRoleModal 
                 roleId = {selectedRole.roleid}
                 roleName={selectedRole.rolename}
                 roleReq={selectedRole.rolerequirements}
                 slot={selectedRole.maximumslot}
                 closeModal={closeModal}
                 />
            )}

            <table className="table table-compact w-full">
                <thead>
                    <tr>
                    <th className="sticky w-30 top-0 text-center">Role Name</th>
                    <th className="sticky top-0 w-30 text-center">Requirements</th>
                    <th className="sticky top-0 w-20 text-center">Max Slot</th>
                    <th className="sticky top-0 text-center">Action</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {roles.map((roleItem, index) => (
                    <tr key={index}>
                        <td className="text-center w-64">
                            <div className="whitespace-normal">{roleItem.rolename}</div>
                        </td>
                        <td className="text-center">
                            <div className="whitespace-normal">{roleItem.rolerequirements} </div>        
                        </td>
                        <td className="text-center">
                            <div className="whitespace-normal">{roleItem.maximumslot} </div>        
                        </td>
                        
                        <td className="text-center w-32">
                            <button className="btn btn-info btn-sm btn-outline font-bold  border-blue-400"
                            onClick={()=>{
                                setSelectedRole(roleItem);
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

export default ManageRoleTable