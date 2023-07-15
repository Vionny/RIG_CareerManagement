"use client"
import "@/app/globals.css"

import {useEffect, useState} from 'react'
import { useParams } from 'next/navigation';

const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

const AssistantDetail= ({id})=>{
    // const params = useParams();
    // const uid = params.uid;
    // console.log(uid);
    console.log(id);

    return(
        <div className="bg-base-200 flex flex-col pl-10 pr-10 pt-5 w-full min-h-screen">
            <div className="card w-full bg-base-100 ">
                <div className="card-body w-full">
                    <div className="card-title justify-between">
                        <p className="card-title mb-2">Assistant Detail {id}</p>
                        
                    </div>

                        {/* detail */}
                <div className="bg-base-100 card w-full h-fit">
                    <div className="card-body p-3 w-full">
                        <div className="card-title justify-between">
                            <p className="card-title">Assistant Detail</p>
                        </div>
                        <div className="flex flex-row gap-5">
                            <figure className="bg-slate-300 w-fit">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp7fl8up-1-T7_OD4AbWBCs9T7CK6iaFGGpA&usqp=CAU" className="w-44" alt="Photo" />
                            </figure>

                            <div className="flex flex-row gap-1">
                                <div className="w-52">
                                    <h3 className="text-lg font-semibold">Initial</h3>
                                    <h3 className="text-lg font-semibold">Name</h3>
                                </div>

                                
                                
                            </div>
                        </div>  
                        
                        <div className="flex gap-5">

                            <div className="card bg-base-200 p-2 h-fit max-h-96 overflow-y-auto">
                                <div className=" text-lg font-semibold">Choices</div>

                                <div className="my-2">
                                    <div className="font-semibold">Priority 1</div>
                                    <p>Choice 1</p>
                                    <p>Reason Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam quisquam dolorem sint quod maiores eaque fugiat eveniet distinctio rem cupiditate pariatur, consectetur hic rerum ea placeat, iure temporibus, magnam quam?</p>
                                </div>

                                <div className="my-2">

                                    <div className="font-semibold">Priority 2</div>
                                    <p>Choice 1</p>
                                    <p>Reason Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam quisquam dolorem sint quod maiores eaque fugiat eveniet distinctio rem cupiditate pariatur, consectetur hic rerum ea placeat, iure temporibus, magnam quam?</p>

                                </div>
                                
                                <div className="my-2">

                                    <div className=" font-semibold">Priority 3</div>
                                    <p>Choice 1</p>
                                    <p>Reason Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam quisquam dolorem sint quod maiores eaque fugiat eveniet distinctio rem cupiditate pariatur, consectetur hic rerum ea placeat, iure temporibus, magnam quam?</p>
                                </div>
                            </div>   

                            <div className="card bg-base-200 p-2 h-fit max-h-96 overflow-y-auto">
                                <div className="text-lg font-semibold">Comments</div>

                                <div className="flex flex-row gap-2 p-2 items-center rounded bg-red-200">
                                    <p className="w-10 h-fit">-1</p>
                                    <div className="flex flex-col">

                                        <p>Reason Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam quisquam dolorem sint quod maiores eaque fugiat eveniet distinctio rem cupiditate pariatur, consectetur hic rerum ea placeat, iure temporibus, magnam quam?</p>
                                        <p className="self-end text-sm">by Initial</p>
                                    </div>
                                </div>

                                <div>
                                    <textarea name="" id="" cols="30" rows="10"></textarea>
                                </div>
                            </div>   
                        </div>

                        <div className="flex flex-col">

                            <div className="overflow-x-auto">
                                <table className="table border rounded-lg">
                                    <thead >
                                        <tr>
                                            <th className="whitespace-normal text-center w-32">HC Letter</th>
                                            <th className="whitespace-normal text-center w-32">Ast Spv Letter</th>
                                            <th className="whitespace-normal text-center w-32">Absence</th>
                                            <th className="whitespace-normal text-center w-32">Forgot</th>
                                            <th className="whitespace-normal text-center w-32">Late</th>
                                            <th className="whitespace-normal text-center w-32">Toleration</th>
                                            <th className="whitespace-normal text-center w-32">Leave</th>
                                                                                        
                                        </tr>
                                    </thead>
                                    {/* <tbody>
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
                                                    selectedDiv(divItem);
                                                    setShowEditModal(true);
                                                }}
                                                >Edit</button>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody> */}
                                </table>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="table border rounded-lg">
                                    <thead className="p-0">
                                        <tr className="p-0">   
                                            <th className="whitespace-normal text-center w-32">Sick</th>
                                            <th className="whitespace-normal text-center w-32">Alpha</th>
                                            <th className="whitespace-normal text-center w-32">Casemake Deadline</th>
                                            <th className="whitespace-normal text-center w-32">Correction Deadline</th>
                                            <th className="whitespace-normal text-center w-32">Teaching Absence</th>
                                            <th className="whitespace-normal text-center w-32">Teaching Late</th>
                                            <th className="whitespace-normal text-center w-32">Teaching Permission</th>                                          
                                        </tr>
                                    </thead>
                                    {/* <tbody>
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
                                                    selectedDiv(divItem);
                                                    setShowEditModal(true);
                                                }}
                                                >Edit</button>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody> */}
                                </table>
                            </div>


                            </div>
                        
                    </div>
                </div>

                        
                </div>
            </div>
        </div>
    )

}

export default AssistantDetail;