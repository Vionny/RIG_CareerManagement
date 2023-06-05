"use client"
import "@/app/globals.css"
import {useEffect, useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const ViewSnP= ()=>{

    //semester
    const smtList = [
        { start: 'GH22-1', semester: 'Gratia Honestha', end: 'Assistant'},
        { start: 'VA22-1', semester: 'Vionny Audrey Sen', end: 'Assistant'},
        { start: 'CH21-1', semester: 'Chelsey', end: 'OP Man' },
        { start: 'JM22-1', semester: 'Jeremy Loa', end: 'NA Staff' },
      ];

    
    //date
    const [startPromotion, setStartP] = useState(new Date());
    const [endPromotion, setEndP] = useState(new Date());

    const [startRegistration, setStartR] = useState(new Date());
    const [endRegistration, setEndR] = useState(new Date());


    return(
        <div className="bg-base-200 flex flex-col pl-10 pr-10 pt-5  w-full min-h-screen">
            <article className="prose base mb-5">
                    <h2>Semester and Period</h2>
            </article>

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
                                {smtList.map((smt, index) => (
                                    <tr key={index}  >
                                        <td>{smt.semester}</td>
                                        <td>{smt.start}</td>
                                        <td>{smt.end}</td>
                                        
                                        <td className="flex flex-col items-center">
                                            <button>Edit</button>
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