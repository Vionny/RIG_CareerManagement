
"use client"
import {React, useState} from 'react';
import "@/app/globals.css"
import ManageCareerTable from '@/components/ManageCareerTable';
import PieChart from '@/components/PieChart';
import RoleStatisticTable from '@/components/RoleStatisticTable';


function ManageCareerChoice(){
    
    const staff = [
        { initial: 'GH22-1', name: 'Gratia Honestha', role: 'Assistant', careerOption: 'tentative' },
        { initial: 'VA22-1', name: 'Vionny Audrey Sen', role: 'Assistant', careerOption: 'unknown' },
        { initial: 'CH21-1', name: 'Chelsey', role: 'OP Man', careerOption: 'willing' },
        { initial: 'JM22-1', name: 'Jeremy Loa', role: 'NA Staff', careerOption: 'not willing' },
      ];
      
      let divisions = [
        { name: "Division 1", description: "Description 1" },
        { name: "Division 2", description: "Description 2" },
        { name: "Division 3", description: "Description 3" },
        // Add more divisions as needed
    ];

    let roleStat = [
        { role: 'DBA Staff', slot: 4, filled: 4, willing: 2, notwilling: 0, tentative: 1, unknown: 1},
    ]

   const [selectedDivision, setSelectedDivision] = useState(divisions[0]);
   


    return(
        <div className="bg-base-200 flex flex-col pl-10 pr-10 pt-5 justify-center w-full min-h-max">
            <div className="bg-base-300 h-max">

                <article className="prose base mb-5">
                    <h2>Career Choice Management</h2>
                </article>

                <div className="bg-base-100 card shadow-xl  w-full flex-auto p-3">
                    <h1 className="card-title mb-2">Career Choice List</h1>
                    <hr className="border-1 border-black" />
                    <div>
                    <ManageCareerTable staff={staff} />

                    </div>
                </div>
            </div>

            <div className="bg-slate-400 flex flex-row  gap-x-5 h-96 mt-8">
                    <div className='card bg-base-100 w-2/5'>
                        <div className='card-body'>
                            <h2 className='card-title'>Career Choice Statistic</h2>
                            <div className='flex flex-row justify-center items-center h-10'>
                                {divisions.map((division, index) => (
                                    <button
                                    key={index}
                                    onClick={() => setSelectedDivision(division)}
                                    className= {`badge badge-ghost ${selectedDivision === division ? "badge bg-primary" : ""}`}
                                    >
                                    {division.name}
                                    </button>
                                ))}
                                
                                    
                            
                            </div>
                            <div>
                                <PieChart/>
                            </div>
                            
                        </div>
                    </div>
                    <div className='card bg-base-100 w-3/5'>
                        <div className='card-body'>
                            <h2 className='card-title'>Role Statistic</h2>
                            <RoleStatisticTable role={roleStat}/>
                        </div>
                    </div>
                   

            </div>
           
        </div>

    )

}

export default ManageCareerChoice