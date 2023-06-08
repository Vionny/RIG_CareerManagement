"use client"
import "@/app/globals.css"
import "@/components/Modals/Edit/EditCareerModal.jsx"
import EditCareerModal from "@/components/Modals/Edit/EditCareerModal.jsx";
import React from 'react';

const ManageCareerTable = ({ staff }) => {
  const getBgColor = (option) => {
    if (option === 'tentative') {
      return 'badge-warning';
    } else if (option === 'willing') {
      return 'badge-success';
    } else if (option === 'not willing') {
      return 'badge-error';
    } else if (option === 'unknown') {
      return 'badge-info';
    }
  };

  return (
    <table className="table table-compact w-full">
      <thead >
        <tr>
          <th>Inisial</th>
          <th>Name</th>
          <th>Role</th>
          <th>Career Option</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody >
        {staff.map((staffItem, index) => (
          <tr key={index}  >
            <td>{staffItem.initial}</td>
            <td>{staffItem.name}</td>
            <td>{staffItem.role}</td>
            <td>
                <div className={`badge ${getBgColor(staffItem.careerOption)}`}>
                    {staffItem.careerOption}
                </div>
            </td>
            <td>
                <EditCareerModal staff={staffItem.initial}/>
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ManageCareerTable;