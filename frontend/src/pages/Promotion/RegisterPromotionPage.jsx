"use client"
import "@/app/globals.css"
import {useEffect, useState} from 'react'
const axios = require("axios")

const RegisterPromotionPage = ()=>{
    const [divisions,setDivisions] = useState({})
    const [loadDiv,setLoadDiv] = useState(false)
    const [selectedDivision, setSelectedDivision] = useState();
    const [roles,setRoles] = useState();
    const [selectedRole, setSelectedRole] = useState();
    async function getRoles(divisionid){
        await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getRoleByDivision/'+divisionid).then((res)=>{
            setRoles(res.data)
        })
        // console.log(roles)
        
    } 
    useEffect(()=>{
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getAllDivision').then(async (res) => {
            // console.log(res.data)
            setDivisions(res.data)  
            setLoadDiv(true)
        })
    },[!loadDiv])


    const btnActive = false;
    if(!loadDiv) return <div></div>
    else
    return(
        <div className=" pl-10 pr-10 py-5 bg-base-200 min-h-full w-full ">

            <article className="prose base mb-5">
                <h2>Promotion Registration for Even 2022/2023</h2>
            </article>


            <div className="alert bg-red-200 shadow-lg mb-5">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6 text-red-800" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="font-bold text-red-800">You can only choose 3, so think wisely. The registration period will be ended on Friday, June 2nd, 2023</span>
                </div>
            </div>

            <div className="flex flex-row gap-x-5 mb-5">
                <div className="rounded-md flex items-center p-3 bg-slate-300 w-1/4 h-12">
                    <h2 className="card-title ">Priority 1</h2>    
                </div>

                <div className="dropdown w-1/4">
                    <label tabIndex={0} className="btn btn-ghost bg-base-100 flex justify-start normal-case card-title ">Total Period</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full h-max">
                        <li><a className="h-8">1 semester</a></li>
                        <li><a className="h-8">2 semester</a></li>
                        <li><a className="h-8">3 semester</a></li>
                    </ul>
                </div>

                <div className="dropdown justify-start w-2/4">
                    <label tabIndex={0} className="btn btn-ghost bg-base-100 flex justify-start  normal-case card-title ">{
                       (selectedDivision == undefined ? "Choose Division" : selectedDivision.divisionname)
                    }</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full h-max">
                        {
                            divisions.map((division,index)=>{
                                if(division.divisionid.substring(0,division.divisionid.indexOf(' ')) !== "DIV007")
                                {return(<li key={index} onClick={()=>{
                                    setSelectedDivision(division)
                                    getRoles(division.divisionid)
                                }}><a className="h-8">{division.divisionname}</a></li>)}
                            })
                        }
                    </ul>
                </div>
            </div>

            <div className="card bg-base-100  flex-auto h-96 ">
                <div className="card-body flex flex-col">
                    <h2 className="card-title ">Reason :</h2>
                    <textarea className="textarea-md w-full h-64 resize-none bg-base-200" placeholder="My reason is..."></textarea>
                </div>
            </div>   


            <div className="flex justify-end my-5">
                <button className="btn btn-primary w-32 mr-3" >Submit</button>
            </div>

            <div className="flex flex-row gap-x-5">
                <div className="card bg-base-100 w-3/5">
                    <div className="card-body ">
                        <h2 className="card-title">{(selectedRole !== undefined ? selectedRole.rolename : "")}</h2>
                        {(selectedRole !== undefined ? <p>{selectedRole.rolerequirements}</p> : <p></p>)}
                    </div>
                </div>

                <div className="card bg-base-100 w-2/5">
                    <div className="card-body ">
                        <h2 className="card-title">Requirements / Job Description</h2>
                        <div>
                        {((selectedDivision == undefined ||roles == undefined) ? "" :
                            roles.map((role,index) => (
                                <button key={index}
                                    onClick={() => setSelectedRole(role)}
                                    className={"badge badge-ghost" + (selectedRole === role ? " badge badge-primary" : "")}
                                >{role.rolename}
                                </button>)
                            
                        ))}

                                {(selectedDivision !== undefined ? <p>{selectedDivision.divisiondescription}</p> : <p></p>)}
                            
                        </div>
                        
                    </div>
                </div>


            </div>
            
            


        </div>

    )
}

export default RegisterPromotionPage