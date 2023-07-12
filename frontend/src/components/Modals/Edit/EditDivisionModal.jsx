'use client'
import "@/app/globals.css"
import { useEffect, useState } from 'react';
const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

const EditDivisionModal = ({divId, divName, divDesc, closeModal}) => {

    const [divisionName, setDivName] = useState()
    const [divisionDesc, setDivDesc] = useState()
    
    useEffect(() => {
        setDivDesc(divDesc)
        setDivName(divName)
    }, [])

    const updateDivision = () =>{
     
        var data = {
            divisionname: divisionName,
            divisiondescription: divisionDesc,
            divisionid: divId
    
        }
        console.log(data);
        axios
        .post(process.env.NEXT_PUBLIC_BACKEND_URL + '/updateDivision', data)
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
                <h2 className="text-xl font-semibold mb-4">Edit Division</h2>
                <button className="btn btn-sm  btn-error absolute right-2 top-2" onClick={closeModal}>✕</button>
                

                
                <div className="flex flex-col">
                    <h2 className="label-text text-lg mt-2">Division Name</h2> 
                    <input type="text" onChange={(e) => setDivName(e.target.value)} value={divisionName} className="input input-bordered w-full" />
                </div>
                
                
                <div className="flex flex-col">

                        <span className="label-text text-lg mt-2">Division Description</span> 
                        <textarea className="textarea textarea-bordered" onChange={(e) => setDivDesc(e.target.value)}  value={divisionDesc} ></textarea>

                </div>
                <div className="flex justify-end mt-8">
                <button
                    className="px-6 py-2 bg-blue-500 text-white rounded "
                    onClick={() => updateDivision()}
                >
                    Edit
                </button>
                </div>
            </div>
            </div>
    );
};

export default EditDivisionModal;