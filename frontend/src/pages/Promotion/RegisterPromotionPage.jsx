"use client"
import "@/app/globals.css"
import { UserContext } from "@/components/UserContext"
import {useContext, useEffect, useState} from 'react'
const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

const RegisterPromotionPage = ()=>{
    const [division,setDivision] = useState({})
    const [loadRole,setLoadRole] = useState(false)
    const [selectedDivision, setSelectedDivision] = useState();
    const [roles,setRoles] = useState();
    const [selectedRole, setSelectedRole] = useState();
    const [priority, setPriority] = useState()
    const [periodInput, setPeriodInput] = useState()
    const [reasonInput, setReasonInput] = useState()
    const { user } = useContext(UserContext);
    const [errText, setErrText] = useState("")


    async function getDivision(divisionid){
        await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getDivisionByRole/'+divisionid).then((res)=>{
            console.log(res)
            setDivision(res.data[0])
        })
        // console.log(roles)
        
    } 
    useEffect(()=>{
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getAstRegisteredRole/'+sessionStorage.getItem('initial')+'/'+ sessionStorage.getItem('selectedSemester')).then(async (res) => {
            // console.log(res.data)
            setRoles(res.data)  
            setLoadRole(true)
            axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/promotion/getLastPriorityInsert/'+sessionStorage.getItem('initial')+'/'+sessionStorage.getItem('selectedSemester')).then((res)=>{
                console.log(res.data)
                if(res.data === 0) setPriority(1)
                else setPriority(res.data[0].priority + 1)
            })
        })
        
    },[loadRole])
    const insertPromotion = () => {
        if(periodInput == null || periodInput.length == 0) setErrText("Please input period field")
        else if(selectedRole == undefined) setErrText("Please choose a role to register")
        else if(reasonInput == null || reasonInput.length == 0) setErrText("Please input reason field")
        else if(isNaN(periodInput)) setErrText("Period must be numeric")
        else {
            var data = {
                initial: sessionStorage.getItem('initial'),
                semesterid: sessionStorage.getItem('selectedSemester'),
                roleid: selectedRole.roleid,
                priority: priority,
                registrationreason: reasonInput,
                iscandidate: false,
                period: periodInput,
              };
              
              console.log(data)
              axios
                .post(process.env.NEXT_PUBLIC_BACKEND_URL + '/promotion/registerPromotion', data)
                .then((res) => {
                  console.log(res);
                })
                .catch((error) => {
                  console.error(error);
                });
        }
       
      };
      

    const btnActive = false;


    if(!loadRole) return <div></div>
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
                    <h2 className="card-title ">Priority {
                       (priority == undefined ? "0" : priority)
                    }</h2>    
                </div>

                <div className="dropdown w-1/4">
                    <input onChange={(e)=>{setPeriodInput(e.target.value)}} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </div>

                <div className="dropdown justify-start w-2/4">
                    <label tabIndex={0} className="btn btn-ghost bg-base-100 flex justify-start  normal-case card-title ">{(selectedRole !== undefined ? selectedRole.rolename : "Choose Role")}</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full h-max">
                        {
                            roles.map((role,index)=>{
                                return(<li key={index} onClick={()=>{
                                    setSelectedRole(role)
                                    getDivision(role.divisionid)
                                }}><a className="h-8">{role.rolename}</a></li>)
                            })
                        }
                    </ul>
                </div>
            </div>

            <div className="card bg-base-100  flex-auto h-96 ">
                <div className="card-body flex flex-col">
                    <h2 className="card-title ">Reason :</h2>
                    <textarea onChange={(e)=>{setReasonInput(e.target.value)}} className="textarea-md w-full h-64 resize-none bg-base-200" placeholder="My reason is..."></textarea>
                </div>
            </div>   
            
            {((errText == ""||errText==null)? <div></div>:
            <div className="alert bg-red-200 shadow-lg mb-5">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6 text-red-800" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="font-bold text-red-800">{errText}</span>
                </div>
            </div>
            )}

            <div className="flex justify-end my-5">
                <button onClick={()=>insertPromotion()} className="btn btn-primary w-32 mr-3" >Submit</button>
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
                        <h2 className="card-title">{(division !== undefined) ? <p>{division.divisionname}</p> : <p></p>}</h2>
                        <div>
                                <h2>Division Desciption</h2>
                                {(division !== undefined) ? <p>{division.divisiondescription}</p> : <p></p>}
                            
                        </div>
                        
                    </div>
                </div>


            </div>
            
            


        </div>

    )
}

export default RegisterPromotionPage