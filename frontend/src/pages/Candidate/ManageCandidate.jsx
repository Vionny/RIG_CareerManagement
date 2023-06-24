"use client"
import "@/app/globals.css"
import {useEffect, useState} from 'react'

const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

const ManageCandidate = ()=>{

    const [currSemester,setCurrSemesters] = useState()
    const [loadRegist, setLoadRegist] = useState(false)
    const [regist,setRegist] = useState({})
    

    useEffect(()=>{
        setCurrSemesters(sessionStorage.getItem('selectedSemester'))
        console.log(currSemester);
    
    },[currSemester])


    useEffect(()=>{
        if(currSemester){

            axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getCandidateList/'+currSemester).then((res) => {
                console.log(res.data)
                // setRegist(res.data)  
                // setLoadRegist(true)
            })
        }

    },[loadRegist])



    if(!loadRegist){
        return(
            <div className="bg-base-200 flex flex-col pl-10 pr-10 pt-5 w-full min-h-screen">       
            </div>
        )
    }
    else{

        return(
            <div className="bg-base-200 flex flex-col pl-10 pr-10 pt-5 w-full min-h-screen">
            <article className="prose base mb-5">
                <h2>Candidate Management</h2>
            </article>

            {/* table */}
            <div className="card w-full bg-base-100 ">
                    <div className="card-body w-full">
                        <div className="card-title justify-between">
                            <p className="card-title mb-2">Promotion Registrant</p>
                            {/* <button className="btn text-xs btn-primary" onClick={() => openAddModal()}>+ Add</button> */}
                        </div>

                        
                        <div className="">
                            <table className="table table-compact w-full">
                                {/* head */}
                                <thead>
                                <tr>                                 
                                    <th>Initial</th>
                                    <th>Priority 1</th>
                                    <th>Priority 2</th>
                                    <th>Priority 3</th>
                                    <th>Quantitative Problem</th>
                                    <th>Comments</th>
                                    <th>OP Rank</th>
                                    <th>AstDev Rank</th>
                                    <th>Subco Rank</th>
                                    <th>NA Staff Rank</th>
                                </tr>
                                </thead>
                                <tbody>

                                {/* {semesters.map((sem, index) => (
                                    <tr key={index}  >
                                        <td>{sem.semestername}</td>
                                        <td>{sem.semesterstartdate}</td>
                                        <td>{sem.semesterenddate}</td>
                                        
                                        <td className="flex flex-col items-center">
                                        <button onClick={() => openModal(sem.semesterid)}>Edit</button>
                                        <button onClick={() => deleteSemester(sem.semesterid)}>Delete</button>
                                        </td>
                                        
                                        </tr>
                                    ))} */}

                                </tbody>
                            </table>
                            </div>
                    </div>
                </div>


        </div>
    )
}


}


export default ManageCandidate
