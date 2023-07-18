"use client"
import "@/app/globals.css"
import {useContext, useEffect, useState} from 'react'
import BarChart from "@/components/BarChart"
const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

const ManagePromotionPage = ()=>{

    const [registers, setRegist] = useState();
    const [loadRegist, setLoadRegist] = useState(false);
    const [currSemester,setCurrSemesters] = useState();
    const [registCount, setRegistCount] = useState();
    const [availSlot, setAvailSlot] = useState();
    const [roleCandidate, setRoleCandidate] = useState();
    
    const [filtered, setFiltered] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('None');
    const [loadChart, setLoadChart] = useState(false)
    useEffect(()=>{
        if(registers){

            if(selectedOption === "None" && keyword === "") setFiltered(false);
            else if(selectedOption === "None" && keyword !== ""){
                // console.log("no selection optin");
                setFilteredData( registers.filter(register => register.initial.toLowerCase().includes(keyword.toLowerCase()) || register.assistantname.toLowerCase().includes(keyword.toLowerCase())) || register.rolename.toLowerCase().includes(keyword.toLowerCase()));
                setFiltered(true);
            }
            else if(selectedOption !== "None" && keyword !== ""){
                // console.log("filter and search");
                setFiltered(true);
                setFilteredData( 
                    registers.filter( register => register.initial.toLowerCase().includes(keyword.toLowerCase()) || register.assistantname.toLowerCase().includes(keyword.toLowerCase()) || register.rolename.toLowerCase().includes(keyword.toLowerCase())
                    ).filter((register) => register.initial.includes(selectedOption))
                );
                
            }
            else{              
                setFiltered(true);
                setFilteredData(registers.filter(register => register.initial.includes(selectedOption)));

            }
        }
        
    },[keyword, selectedOption])

    useEffect(()=>{
        // console.log(sessionStorage.getItem('selectedSemester'));
        setCurrSemesters(sessionStorage.getItem('selectedSemester'))
        if(currSemester){
            
            axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/promotion/getPromotionRegistrant/'+currSemester).then((res) => {
                if(res.data!== undefined){
                    // console.log(res.data[0])               
                    setRegist(res.data)  
                    setLoadRegist(true)
                    // console.log(registers);
                }
            })

            axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getRegistCount/'+currSemester).then((res) => {
                if(res.data!== undefined){
                    // console.log(res.data)
                
                    setRegistCount(res.data)  
                    
                    // console.log(registeregistCountrs);
                }
            })

            axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getRoleAvailSlot').then((res) => {
                if(res.data!== undefined){
                    // console.log(res.data)
                
                    setAvailSlot(res.data)  
                    
                    // console.log(registeregistCountrs);
                }
            })

            axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getRoleCandidate/' + currSemester).then((res) => {
                if(res.data!== undefined){
                    // console.log(res.data)
                
                    setRoleCandidate(res.data[0])  
                    
                    // console.log(registeregistCountrs);
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

            <div className="card bg-base-100  flex-auto ">
                <div className="card-body flex flex-col h-96 p-3 m-5">
                    <h2 className="card-title mb-5">Candidate Statistic</h2>           
                    <div className="w-80">
                        <BarChart  style={{ height: "50px" }} options={{ maintainAspectRatio: false }} regisData={registCount} candidateData={roleCandidate} slotData={availSlot} load={setLoadChart}/>
                    </div>         
                </div> 
            </div> 

            <div className="card bg-base-100  flex-auto h-96 ">
                <div className="card-body flex flex-col">
                    <h2 className="card-title ">Promotion Registrant</h2>
                    <div>
                    <input type="text" placeholder="Search" className="input input-bordered w-full my-2 max-w-xs" onChange={e => setKeyword(e.target.value)}/>
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
                                {!filtered
                                ?
                                registers.map((res, index) => (
                                    <tr key={index}  >
                                        <td>{res.initial}</td>
                                        <td>{res.assistantname}</td>
                                        <td>{res.rolename}</td>
                                        <td>{res.registrationreason}</td>
                                        <td>{res.priority}</td>
                                        <td>{res.period}</td>
                                        <td>{res.eligiblepromotionstatus ? 'Eligible' : 'Not Eligible'}</td>
                                       
                                        
                                        
                                         
                                    </tr>
                                    ))
                                    :
                                    filteredData.map((res, index) => (
                                        
                                        <tr key={index}  >
                                        <td>{res.initial}</td>
                                        <td>{res.assistantname}</td>
                                        <td>{res.rolename}</td>
                                        <td>{res.registrationreason}</td>
                                        <td>{res.priority}</td>
                                        <td>{res.period}</td>
                                        <td>{res.eligiblepromotionstatus ? 'Eligible' : 'Not Eligible'}</td>
                                       
                                        
                                        
                                         
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                </div> 
            </div>
         </div>



    )
}

export default ManagePromotionPage