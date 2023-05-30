"use client"
import "../app/globals.css"
import React from 'react';

const RoleStatisticTable = ({ role }) => {

  return (
    <table className="table table-compact w-full">
      <thead >
        <tr>
          <th>Role</th>
          <th>Slot</th>
          <th>Filled</th>
          <th>Willing</th>
          <th>Not Willing</th>
          <th>Tentative</th>
          <th>Action</th>
          
        </tr>
      </thead>
      <tbody >
        {role.map((roleItem, index) => (
          <tr key={index}  >
            <td>{roleItem.role}</td>
            <td>{roleItem.slot}</td>
            <td>{roleItem.willing}</td>
            <td>{roleItem.notwilling}</td>
            <td>{roleItem.tentative}</td>
            <td>{roleItem.unknown}</td>
            <td>
                <button>Edit</button>
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoleStatisticTable;