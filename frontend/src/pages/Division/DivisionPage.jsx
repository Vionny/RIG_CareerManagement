"use client"
import "@/app/globals.css"
import { UserContext } from "@/components/UserContext"
import { useContext, useEffect, useState } from "react";
const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

const DivisionPage = ()=>{

    const [divisions,setDivisions] = useState({});
    const [division, setDivision] = useState({});
    const [loadDiv, setLoadDiv] = useState(false);
    const [selectedDivision, setSelectedDivision] = useState();
    const [roles, setRoles] = useState({});
    const [members, setMembers] = useState([]);
    const { user } = useContext(UserContext);
    const [errText, setErrText] = useState("")

    async function getDivisionNow(divisionid){
        await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getDivisionByRole/'+divisionid).then((res)=>{
            // console.log(res.data[0])
            setDivision(res.data[0])
            
        }),
        Object.keys(roles).map((key,index)=>{
            const role = roles[key]
            console.log(role.roleid)
            getMembers(role.roleid)
        
        
        })
        
    }

    async function getRoles(divisionid){
        await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getRoleByDivision/'+divisionid).then((res) =>{
            // console.log(res.data)
            setRoles(res.data)
        })
    }

    //blm bisa fetch
    async function getMembers(roleid){
        await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getTeamMember/'+roleid).then((res) =>{
            console.log(res.data)
            // setMembers(res.data)
        })
    }

    useEffect(()=>{
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+ '/getAllDivision').then(async(res) =>{
            // console.log(res.data);
            setDivisions(res.data);
            setLoadDiv(true);
        })
    }, [loadDiv])

    if(!loadDiv) return <div></div>
    else
    return(
        <div className="pl-10 pr-10 py-5 bg-base-200 min-h-screen w-full ">

            <article className="prose base mb-5">
                <h2>Division List</h2>
            </article>

            <div className="dropdown justify-start w-full mb-5">
                <label tabIndex={0} className="btn btn-ghost bg-base-100 flex justify-start  normal-case card-title ">{(selectedDivision !== undefined ? selectedDivision.divisionname :"Choose Division")}</label>
                    <ul  tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full h-max">
                    {
                        divisions.map((div, index) =>{
                            // console.log(div.divisionname)
                            return(
                                <li key={index} onClick={()=>{
                                    setSelectedDivision(div)
                                    getDivisionNow(div.divisionid)
                                    getRoles(div.divisionid)
                                }}>
                            
                                    <a className="h-8  font-semibold">{div.divisionname}
                                    </a>
                            
                                </li>
                            )
                        })
                    }
                    </ul>
                
            </div>
                    

            

            <div className="card bg-base-100 w-full h-72 p-5">
                <div className="card-body h-full p-0">
                    <h2 className="card-title">{(selectedDivision !== undefined ? selectedDivision.divisionname : "")}</h2>
                    {(selectedDivision !== undefined ? <p>{selectedDivision.divisiondescription}</p> : <p></p>)}
                    {/* <h2 className="card-title">Selected Division</h2>
                    <p>Division Description</p> */}
                </div>
            </div>

            <div className=" flex flex-row gap-x-5 mt-10 h-72 min-h-fit">
                

                {/* <div className="card bg-base-100 w-2/5">
                    <div className="card-body ">
                        <h2 className="card-title">{(division !== undefined) ? <p>{division.divisionname}</p> : <p></p>}</h2>
                        <div>
                                <h2>Division Desciption</h2>
                                {(division !== undefined) ? <p>{division.divisiondescription}</p> : <p></p>}
                            
                        </div>
                        
                    </div>
                </div> */}

                <div className="card bg-base-100 w-1/2 p-5">
                    <div className="card-body p-0">

                        {
                           Object.keys(roles).map((key,index)=>{
                                const role = roles[key]
                                // console.log(role.rolename)
                                // console.log(role.rolerequirements)
                                return(
                                    <div key={index}>

                                        <h2 className="card-title">{(role !== undefined ? role.rolename : "")}</h2>
                                        {(role !== undefined ? <p>{role.rolerequirements}</p> : <p></p>)}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="card bg-base-100 w-1/2 p-5">
                    <div className="card-body p-0">
                        {/* <h2 className="card-title">{(selectedRole !== undefined ? selectedRole.rolename : "")}</h2>
                        {(selectedRole !== undefined ? <p>{selectedRole.rolerequirements}</p> : <p></p>)} */}
                        <h2 className="card-title">Team Member</h2>
                        <p>Division Mmeber</p>
                    </div>
                </div>

                

            </div>



        </div>

    )
}

export default DivisionPage


