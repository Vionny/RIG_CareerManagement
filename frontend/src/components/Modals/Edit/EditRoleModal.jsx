'use client'
import "@/app/globals.css"
import { useEffect, useState } from 'react';
const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

const EditDivisionModal = ({roleId, roleName, roleReq, slot, closeModal}) => {

    const [roleNm, setRoleName] = useState()
    const [roleRq, setRoleReq] = useState()
    const [maxSlot, setMaxSlot] = useState()
    
    useEffect(() => {
        setRoleName(roleName)
        setRoleReq(roleReq)
        setMaxSlot(slot)
    }, [])

    const updateRole = () =>{
     
        var data = {
            rolename : roleNm,
            maximumslot : maxSlot,
            rolerequirements : roleRq,
            roleid : roleId
    
        }
        console.log(data);
        axios
        .post(process.env.NEXT_PUBLIC_BACKEND_URL + '/updateRole', data)
        .then((res) =>{
            console.log(res)
            if(res.data== 'Success'){
                window.location.reload();    
              }
        })
        .catch((error)=>{
            console.error(error)
        })
    
      }

    return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="modal-box">
                <h2 className="text-xl font-semibold mb-4">Edit Role</h2>
                <button className="btn btn-sm  btn-error absolute right-2 top-2" onClick={closeModal}>✕</button>
                

                
                <div className="flex flex-col">
                    <h2 className="label-text text-lg mt-2">Role Name</h2> 
                    <input type="text" onChange={(e) => setRoleName(e.target.value)} value={roleNm} className="input input-bordered w-full" />
                </div>

                <div className="flex flex-col">
                    <h2 className="label-text text-lg mt-2">Maximum Slot</h2> 
                    <input type="text" onChange={(e) => setMaxSlot(e.target.value)} value={maxSlot} className="input input-bordered w-14" />
                </div>
                
                
                <div className="flex flex-col">

                        <span className="label-text text-lg mt-2">Requirements</span> 
                        <textarea className="textarea textarea-bordered" onChange={(e) => setRoleReq(e.target.value)}  value={roleRq} ></textarea>

                </div>
                <div className="flex justify-end mt-8">
                <button
                    className="px-6 py-2 bg-blue-500 text-white rounded "
                    onClick={() => updateRole()}
                >
                    Edit
                </button>
                </div>
            </div>
            </div>
    );
};

export default EditDivisionModal;