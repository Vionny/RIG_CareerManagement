"use client"
import "@/app/globals.css"
import { UserContext } from "@/components/UserContext"
import {useContext, useEffect, useState} from 'react'
const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

const ManagePromotionPage = ()=>{

    return(
         <div className="flex flex-col gap-5 pl-10 pr-10 py-5 bg-base-200 min-h-screen w-full">
            <article className="prose base">
                <h2>Promotion Management</h2>
            </article>

            <div className="card bg-base-100  flex-auto h-96 ">
                <div className="card-body flex flex-col">
                    <h2 className="card-title ">Candidate Statistic</h2>
                    <textarea className="textarea-md w-full h-64 resize-none bg-base-200" placeholder="My reason is..."></textarea>
                </div>
            </div> 

            <div className="card bg-base-100  flex-auto h-96 ">
                <div className="card-body flex flex-col">
                    <h2 className="card-title ">Promotion Registrant</h2>
                    <div>
                    <input type="text" placeholder="Search" className="input input-bordered w-full max-w-xs" />
                    </div>
                    <table className="table table-compact w-full">
                                {/* head */}
                                <thead>
                                <tr>
                                   
                                    <th>Initial</th>
                                    <th>Name</th>
                                    <th>Choose</th>
                                    <th>Reason</th>
                                    <th>Priority</th>
                                    <th>EligibleForPromotion</th>
                                    <th>FuturePlan</th>
                                    <th>FuturePlanFinalize</th>
                                </tr>
                                </thead>
                                <tbody>
                                {/* {users.map((us, index) => (
                                    <tr key={index}  >
                                        <td>{us.initial}</td>
                                        <td>{us.assistantname}</td>
                                        <td>{us.roleid}</td>
                                        <td>{us.careerchoice}</td>
                                        <td>{us.eligibleforresign}</td>
                                        <td>{us.eligiblepromotionstatus}</td>
                                        <td>{us.futureplan}</td>
                                        <td>{us.fpfinalize}</td>
                                         
                                    </tr>
                                    ))} */}
                                </tbody>
                            </table>
                </div> 
            </div>
         </div>



    )
}

export default ManagePromotionPage