"use client"
import "@/app/globals.css"

import {useEffect, useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

const StaffPage= ()=>{

    const [users, setUsers] = useState();
    const [loadUser, setLoadUser] = useState(false);

    useEffect(()=>{
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getAllUser').then((res) => {
            console.log(res.data)
            setUsers(res.data)  
            setLoadUser(true)
        })

      
        

        
    },[loadUser])

    if(!loadUser) return <div></div>
    else
    return(

        <div className="bg-base-200 flex flex-col pl-10 pr-10 pt-5 w-full min-h-screen">
            Assistant Page

            <div className="card w-full bg-base-100 ">
                    <div className="card-body w-full">
                        <div className="card-title justify-between">
                            <p className="card-title mb-2">Assistant List</p>
                            
                        </div>
                        <div className="">
                            <table className="table table-compact w-full">
                                {/* head */}
                                <thead>
                                <tr>
                                   
                                    <th>Initial</th>
                                    <th>Name</th>
                                    <th>RoleID</th>
                                    <th>CareerChoice</th>
                                    <th>EligibleForResign</th>
                                    <th>EligibleForPromotion</th>
                                    <th>FuturePlan</th>
                                    <th>FuturePlanFinalize</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((us, index) => (
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
                                    ))}
                                </tbody>
                            </table>
                            </div>
                    </div>
                </div>

        </div>
    )
}

export default StaffPage;