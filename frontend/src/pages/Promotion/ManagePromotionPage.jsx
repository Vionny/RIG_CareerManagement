"use client"
import "@/app/globals.css"
import { UserContext } from "@/components/UserContext"
import {useContext, useEffect, useState} from 'react'
const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

const ManagePromotionPage = ()=>{

    const [registers, setRegist] = useState();
    const [loadRegist, setLoadRegist] = useState(false);
    const [currSemester,setCurrSemesters] = useState()
    
    useEffect(()=>{
        // console.log(sessionStorage.getItem('selectedSemester'));
        setCurrSemesters(sessionStorage.getItem('selectedSemester'))
        if(currSemester){
            
            axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/promotion/getPromotionRegistrant/'+currSemester).then((res) => {
                if(res.data!== undefined){
                    console.log(res.data[0])
                
                    setRegist(res.data)  
                    setLoadRegist(true)
                    console.log(registers);
                }
            })
        }

     
    },[currSemester])





    if(!loadRegist) return <div></div>
    else
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
                                    <th>Choice</th>
                                    <th>Reason</th>
                                    <th>Priority</th>
                                    <th>Period</th>
                                    <th>Eligibility</th>
                                </tr>
                                </thead>
                                <tbody>
                                {registers.map((res, index) => (
                                    <tr key={index}  >
                                        <td>{res.initial}</td>
                                        <td>{res.assistantname}</td>
                                        <td>{res.rolename}</td>
                                        <td>{res.registrationreason}</td>
                                        <td>{res.priority}</td>
                                        <td>{res.period}</td>
                                        <td>{res.eligiblepromotionstatus ? 'Eligible' : 'Not Eligible'}</td>
                                       
                                        
                                        
                                         
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                </div> 
            </div>
         </div>



    )
}

export default ManagePromotionPage