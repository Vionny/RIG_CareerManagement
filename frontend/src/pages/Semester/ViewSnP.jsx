"use client"
import "@/app/globals.css"
import { EditSemesterModal } from "@/components/Modals/Edit/EditSemesterModal"
import {useEffect, useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

const ViewSnP= ()=>{

    const [semesters,setSemesters] =useState({})
    const [loadSem, setLoadSem] =useState(false)
    const [selectedSemesterId, setSelectedSemesterId] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = (semesterId) => {
        console.log("open")
        setSelectedSemesterId(semesterId)
        setIsModalOpen(true)
      }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    //date
    const [startPromotion, setStartP] = useState(new Date());
    const [endPromotion, setEndP] = useState(new Date());

    const [startRegistration, setStartR] = useState(new Date());
    const [endRegistration, setEndR] = useState(new Date());



    useEffect(()=>{
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getAllSemester').then((res) => {
            // console.log(res.data)
            setSemesters(res.data)  
            setLoadSem(true)
        })
        
    },[loadSem])


    if(!loadSem) return <div></div>
    else
    return(
        <div className="bg-base-200 flex flex-col pl-10 pr-10 pt-5 w-full min-h-screen">
            
            <article className="prose base mb-5">
                <h2>Semester and Period</h2>
            </article>
            {isModalOpen && (
                    <div className="modal-backdrop bg-black" onClick={closeModal}>
                        <EditSemesterModal semesterid={selectedSemesterId} closeModal={closeModal} />
                    </div>
            )}
            {/* table */}
            <div className="card w-full bg-base-100 ">
                    <div className="card-body w-full">
                        <div className="card-title justify-between">
                            <p className="card-title mb-2">Semester List</p>
                            <button className="btn text-xs btn-primary ">+ Add</button>
                        </div>
                        <div className="">
                            <table className="table table-compact w-full">
                                {/* head */}
                                <thead>
                                <tr>
                                   
                                    <th>Semester</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {semesters.map((sem, index) => (
                                    <tr key={index}  >
                                        <td>{sem.semestername}</td>
                                        <td>{sem.semesterstartdate}</td>
                                        <td>{sem.semesterenddate}</td>
                                        
                                        <td className="flex flex-col items-center">
                                            <button onClick={() => openModal(sem.semesterid)}>Edit</button>
                                            <button>Delete</button>
                                        </td>
                                        
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                    </div>
                </div>

                {/* bawah */}
                <article className="prose base my-5">
                    <h2>
                        <span className="text-primary">Even 2022/2023</span>
                        <span> Period</span>
                    </h2>
                </article>

                <div>
                    <div className="card-title mb-2">Promotion Registration Period</div>

                    <div className="flex flex-row gap-5">

                        <div className="card bg-base-100 w-48 flex p-3">
                            <h3 className="text-lg font-semibold">Start Date</h3>
                            <DatePicker className="w-32" selected={startPromotion} onChange={(startPromotion) => setStartP(startPromotion)} />                
                        </div>

                        <div className="card bg-base-100 w-48 flex p-3">
                            <h3 className="text-lg font-semibold">End Date</h3>
                            <DatePicker className="w-32" selected={endPromotion} onChange={(endPromotion) => setEndP(endPromotion)} />                
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card-title mt-5 mb-2">Career Choice Period</div>

                    <div className="flex flex-row gap-5">

                        <div className="card bg-base-100 w-48 flex p-3">
                            <h3 className="text-lg font-semibold">Start Date</h3>
                            <DatePicker className="w-32" selected={startRegistration} onChange={(startRegistration) => setStartR(startRegistration)} />                
                        </div>

                        <div className="card bg-base-100 w-48 flex p-3">
                            <h3 className="text-lg font-semibold">End Date</h3>
                            <DatePicker className="w-32" selected={endRegistration} onChange={(endRegistration) => setEndR(endRegistration)} />                
                        </div>
                    </div>
                </div>

        </div>
    )
}

export default ViewSnP