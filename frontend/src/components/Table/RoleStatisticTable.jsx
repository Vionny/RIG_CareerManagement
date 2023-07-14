"use client"
import "@/app/globals.css"
import React from 'react';

const RoleStatisticTable = ({ roleStatistics }) => {

  console.log(roleStatistics)
  return (
    <div className="max-h-80 mt-5 overflow-auto">
        <table className="table table-compact w-full " >
          <thead >
            <tr>
              <th className="sticky top-0 py-4 text-center">Role</th>
              <th className="sticky top-0 py-4 text-center">Available Slot</th>
              <th className="sticky top-0 py-4 text-center">Maximum Slot</th>
              <th className="sticky top-0 py-4 text-center">Filled</th>
              <th className="sticky top-0 py-4 text-center">Willing</th>
              <th className="sticky top-0 py-4 text-center">Not Willing</th>
              <th className="sticky top-0 py-4 text-center">Tentative</th>
              
            </tr>
          </thead>
          <tbody >
            {roleStatistics.map((roleStat, index) => (
              <tr key={index}  >
                <td>{roleStat.rolename}</td>
                <td>{roleStat.maximumslot - roleStat.assistant_count}</td>
                <td>{roleStat.maximumslot}</td>
                <td>{roleStat.assistant_count}</td>
                <td>{roleStat.willing_count}</td>
                <td>{roleStat.not_willing_count}</td>
                <td>{roleStat.tentative_count}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    
  );
};

export default RoleStatisticTable;