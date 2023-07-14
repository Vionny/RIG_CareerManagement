"use client"
import "@/app/globals.css"
import axios from 'axios';
import "@/components/Modals/Edit/EditCareerModal.jsx"
import EditCareerModal from "@/components/Modals/Edit/EditCareerModal.jsx";
import React, { useState } from 'react';
import SimpleInformationModal from "../Modals/Information/SimpleInformationModal";

const ManageCareerTable = ({ assistant , filtered }) => {
  const [selectedAst,setSelectedAst]= useState()
  const [decision, setDecision] = useState()
  const [infoEditedModal,setInfoEditedModal] = useState(false)
  const [showEditModal,setShowEditModal] = useState(false)

  const getBgColor = (option) => {
    if (option === 'tentative') {
      return 'badge-warning';
    } else if (option === 'willing') {
      return 'badge-success';
    } else if (option === 'not willing') {
      return 'badge-error';
    } else if (option === 'unknown' || option === undefined || option ==='') {
      return 'badge-info';
    }
  };

  const handleEditCareer = ()=>{

    console.log(selectedAst)
    if(decision == undefined|| decision== null) {
      setDecision(selectedAst.careerchoice)
    }
    var data = {
      initial: selectedAst.initial,
      careerchoice: (decision ? decision : selectedAst.careerchoice)
    };
    console.log(data)

    axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateAstCareerChoice`,data).then((res)=>{
      if(res.data === 'Success'){
        console.log(res.data)
        setShowEditModal(false)
        setInfoEditedModal(true)
      }
    })

  }


  return (
    <div className="max-h-80 overflow-auto">
    {showEditModal && (
        <EditCareerModal
          initial={selectedAst ? selectedAst.initial : ''}
          currentChoice={decision ? decision : selectedAst.careerchoice}
          setCurrentChoice={setDecision}
          onConfirm={handleEditCareer}
        />
      )}
      {infoEditedModal && (
        <SimpleInformationModal
            title = "Career Choice Updated !"
            message = {"You have successfully updating " + selectedAst.initial +"'s career choice to "+decision+" !"}
            onConfirm= {()=>{window.location.reload()}}/>)}
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th className="sticky top-0 py-4 text-center">Initial</th>
              <th className="sticky top-0 py-4 text-center">Name</th>
              <th className="sticky top-0 py-4 text-center">Role</th>
              <th className="sticky top-0 py-4 text-center">Career Option</th>
              <th className="sticky top-0 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {assistant.map((assistantItem, index) => (
              <tr key={index}>
                <td className="text-center">{assistantItem.initial}</td>
                <td className="text-center">{assistantItem.assistantname}</td>
                <td className="text-center">{assistantItem.rolename}</td>
                <td className="text-center">
                  <div className={`badge ${getBgColor(assistantItem.careerchoice)}`}>
                    {assistantItem.careerchoice}
                  </div>
                </td>
                <td className="text-center">
                  <button className="btn btn-info btn-sm btn-outline font-bold  border-blue-400" onClick={()=>{
                    setSelectedAst(assistantItem);
                    setShowEditModal(true);
                  }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default ManageCareerTable;