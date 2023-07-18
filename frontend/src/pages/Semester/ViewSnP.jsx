"use client"
import "@/app/globals.css"
import ConfirmationModal from "@/components/Modals/Confirmation/ConfirmationModal"
import { EditSemesterModal } from "@/components/Modals/Edit/EditSemesterModal"
import SimpleInformationModal from "@/components/Modals/Information/SimpleInformationModal"
import { AddSemesterModal } from "@/components/Modals/Insert/AddSemesterModal"
import {useEffect, useState} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

const ViewSnP= ()=>{

    const [semesters,setSemesters] = useState({})
    const [currSemester,setCurrSemesters] = useState()
    const [loadSem, setLoadSem] = useState(false)
    const [selectedSemesterId, setSelectedSemesterId] = useState(null)
    const [selectedSemester, setSelectedSemester] = useState()
    //date
    const [startPromotion, setStartP] = useState();
    const [endPromotion, setEndP] = useState();

    const [startRegistration, setStartR] = useState();
    const [endRegistration, setEndR] = useState();

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalAddOpen, setIsModalAddOpen] = useState(false)

    const [resetConfirmationModal,setResetConfirmationModal] = useState(false)
    const [showInfoModal ,setShowInfoModal] = useState(false)

    const [errText, setErrText] = useState(null)
    const [infoModal,setInfoModal] = useState()
    const [deleteConfirmationModal,setDeleteConfirmationModal] = useState(false)
    const [toDelete,setToDelete] = useState()
    const openModal = (semesterId) => {
        console.log("open")
        setSelectedSemesterId(semesterId)
        setIsModalOpen(true)
      }

    const closeModal = () => {
        setIsModalOpen(false)
    }
    const openAddModal = () => {
        console.log("open")
        setIsModalAddOpen(true)
      }

    const closeAddModal = () => {
        setIsModalAddOpen(false)
    }

    useEffect(()=>{
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getAllSemester').then((res) => {
            console.log(res.data)
            setSemesters(res.data)  
            setSelectedSemester(res.data.filter((semester) => semester.semesterid.includes(sessionStorage.getItem('selectedSemester'))))

            console.log(selectedSemester)
            setLoadSem(true)
        })

        setCurrSemesters(sessionStorage.getItem('selectedSemester'))
        // console.log("curr smt" +currSemester);

        
    },[loadSem])
    
    useEffect(()=>{
        if (currSemester) {
            axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getPhases/'+currSemester).then((res) => {
                
                console.log(res.data[0])
                handlePromotionEndDate(res.data[0].promotionenddate)
                handlePromotionStartDate(res.data[0].promotionstartdate)
                handleChoiceStartDate(res.data[0].choicestartdate)
                handleChoiceEndDate(res.data[0].choiceenddate)
            })
        }
        
    },[currSemester])

    function handlePromotionEndDate(res) {
        // console.log(res)
        // console.log()
        if (res !== null) {
            setEndP(new Date(res)); // Convert res to a Date object before setting the state
          } else {
            setEndP(new Date()); // Set the current date as the default value
          }
    }

    function handlePromotionStartDate(res) {
        // console.log(res)
        // console.log()
        if (res !== null) {
            setStartP(new Date(res)); // Convert res to a Date object before setting the state
          } else {
            setStartP(new Date()); // Set the current date as the default value
          }
    }

    function handleChoiceEndDate(res) {
        // console.log(res)
        // console.log()
        if (res !== null) {
            setEndR(new Date(res)); // Convert res to a Date object before setting the state
          } else {
            setEndR(new Date()); // Set the current date as the default value
          }
    }

    function handleChoiceStartDate(res) {
        // console.log(res)
        // console.log()
        if (res !== null) {
            setStartR(new Date(res)); // Convert res to a Date object before setting the state
          } else {
            setStartR(new Date()); // Set the current date as the default value
          }
    }


    const updatePromotionDate = () =>{
        const dateParts = selectedSemester[0].semesterstartdate.split("-");
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // Months are zero-based
        const day = parseInt(dateParts[2]);
        const dateObject = new Date(year, month, day);
        const semesterstartdate = dateObject

        const dateParts2 = selectedSemester[0].semesterenddate.split("-");
        const year2 = parseInt(dateParts2[0]);
        const month2 = parseInt(dateParts2[1]) - 1; // Months are zero-based
        const day2 = parseInt(dateParts2[2]);
        const dateObject2 = new Date(year2, month2, day2);
        const semesterenddate = dateObject2

        console.log(semesterenddate,semesterstartdate)
        if(semesterstartdate > startRegistration || semesterenddate < endRegistration ){
            setErrText("Promotion Date must be between the semester period")
        }else{
            var data = {
                promotionstartdate: startPromotion,
                promotionenddate: endPromotion,
                semesterid: currSemester
            }
        console.log(data);
        
            axios
            .post(process.env.NEXT_PUBLIC_BACKEND_URL + '/updatePromotionDate', data)
            .then((res) =>{
                // console.log(res)
                if(res.data== 'Success'){
                    setInfoModal("You have successfully update promotion date !")
                    setShowInfoModal(true)
                }
            })
            .catch((error)=>{
                console.error(error)
            })
        }
    }

    const updateChoiceDate = () =>{
        console.log(startRegistration);
        console.log(endRegistration);
        const dateParts = selectedSemester[0].semesterstartdate.split("-");
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // Months are zero-based
        const day = parseInt(dateParts[2]);
        const dateObject = new Date(year, month, day);
        const semesterstartdate = dateObject

        const dateParts2 = selectedSemester[0].semesterenddate.split("-");
        const year2 = parseInt(dateParts2[0]);
        const month2 = parseInt(dateParts2[1]) - 1; // Months are zero-based
        const day2 = parseInt(dateParts2[2]);
        const dateObject2 = new Date(year2, month2, day2);
        const semesterenddate = dateObject2

        console.log(semesterenddate,semesterstartdate)
        if(semesterstartdate > startRegistration || semesterenddate < endRegistration ){
            setErrText("Choice Date must be between the semester period")
        }else{
            var data = {
                choicestartdate: startRegistration,
                choiceenddate: endRegistration,
                semesterid: currSemester
            }

            console.log(data);
            axios
            .post(process.env.NEXT_PUBLIC_BACKEND_URL + '/updateChoiceDate', data)
            .then((res) =>{
                console.log(res)
                if(res.data== 'Success'){
                    setInfoModal("You have successfully update choice date !")
                    setShowInfoModal(true)
                }
            })
            .catch((error)=>{
                console.error(error)
            })
        }

    }

    const deleteSemester = (semesterid) =>{
        
        if(sessionStorage.getItem('selectedSemester') === semesterid){
            setErrText("You cannot delete the semester that you currently select !")
        }else{
            axios
            .delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteSemester/${semesterid}`)
            .then((res) =>{
                console.log(res)
                if(res.data== 'Success'){
                    setDeleteConfirmationModal(false)
                    setInfoModal("You have successfully delete the semester !")
                    setShowInfoModal(true)
                }
            })
            .catch((error)=>{
                console.error(error)
            })
        
        }
        

    }

    const resetFinalizeHandle = ()=>{
        axios
        .patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/resetFinalize`)
        .then((res) =>{
            console.log(res)
            if(res.data== 'Success'){
                setResetConfirmationModal(false)
                setInfoModal("You have successfully reset the finalize option !")
                setShowInfoModal(true)
            }
        })
        .catch((error)=>{
            console.error(error)
        })
    }

    const refresh = ()=>{
        setShowInfoModal(false)
        window.location.reload();
    }


    if(!loadSem) return <div></div>
    else
    return(
        <div className="bg-base-200 flex flex-col pl-10 pr-10 pt-5 w-full min-h-screen">
            {resetConfirmationModal && (

                <ConfirmationModal
                    title = "Reset Finalize Confirmation"
                    message = "Are you sure you want to reset the finalize ?"
                    onConfirm = {resetFinalizeHandle}
                    onCancel = {()=>{
                        setResetConfirmationModal(false)
                    }}
                />
            )}
            {deleteConfirmationModal && (

            <ConfirmationModal
                title = "Delete Semester Confirmation"
                message = "Are you sure you want to delete the semester ?"
                onConfirm = {()=>{deleteSemester(toDelete)}}
                onCancel = {()=>{
                    setDeleteConfirmationModal(false)
                }}
            />
            )}
            {showInfoModal && (

                <SimpleInformationModal
                    title = "Successful"
                    message = {infoModal}
                    onConfirm = {refresh}
                />
            )}

            <article className="prose base mb-5">
                <h2>Semester and Period</h2>
            </article>
            {isModalOpen && (
                    <div className="modal-backdrop bg-black" >
                        <EditSemesterModal semesterid={selectedSemesterId} closeModal={closeModal} />
                    </div>
            )}

            {isModalAddOpen && (
                    <div className="modal-backdrop bg-black">
                        <AddSemesterModal closeModal={closeAddModal}/>
                    </div>
            )}
            {errText && 
            <div id="toast-danger" className="toast toast-danger mr-7 z-50 flex flex-row items-center w-full max-w-xs p-4 mb-7 text-gray-500 bg-red-400 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">                 
                    <div className="ml-3 font-normal text-white text-lg">{errText}</div>
                    <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-red-200 text-black hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-red-400" data-dismiss-target="#toast-danger" aria-label="Close" onClick={()=>{setErrText("")}}>
                        <span className="sr-only">Close</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>}
        
            {/* table */}
            <div className="card w-full bg-base-100 ">
                    <div className="card-body w-full">
                        <div className="card-title justify-between">
                            <p className="card-title mb-2">Semester List</p>
                            <button className="btn text-xs btn-primary" onClick={() => openAddModal()}>+ Add</button>
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
                                            <button onClick={() => {setToDelete(sem.semesterid)
                                                setDeleteConfirmationModal(true)}
                                            }>Delete</button>
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
                        <span className="text-primary">{selectedSemester ? selectedSemester[0].semestername : ''}</span>
                        <span> Period</span>
                    </h2>
                </article>

                <div>
                    <div className="card-title mb-2">Promotion Registration Period</div>

                    <div className="flex flex-row gap-5">

                        <div className="card bg-base-100 w-48 flex p-3">
                            <h3 className="text-lg font-semibold">Start Date</h3>
                            <DatePicker className="w-32" selected={startPromotion} value={startPromotion} onChange={(startPromotion) => setStartP(startPromotion)} />                
                            
                        </div>

                        <div className="card bg-base-100 w-48 flex p-3">
                            <h3 className="text-lg font-semibold">End Date</h3>
                            <DatePicker className="w-32" selected={endPromotion} value={endPromotion} onChange={(endPromotion) => setEndP(endPromotion)} />                
                        </div>

                        <button className="btn btn-primary" onClick={()=>updatePromotionDate()}>Update</button>

                    </div>
                </div>
                <div>
                    <div className="card-title mt-5 mb-2">Career Choice Period</div>

                    <div className="flex flex-row gap-5">

                        <div className="card bg-base-100 w-48 flex p-3">
                            <h3 className="text-lg font-semibold">Start Date</h3>
                            <DatePicker className="w-32" selected={startRegistration} value={startRegistration} onChange={(startRegistration) => setStartR(startRegistration)} />                
                        </div>

                        <div className="card bg-base-100 w-48 flex p-3">
                            <h3 className="text-lg font-semibold">End Date</h3>
                            <DatePicker className="w-32" selected={endRegistration} value={endRegistration} onChange={(endRegistration) => setEndR(endRegistration)} />                
                        </div>

                        <button className="btn btn-primary" onClick={()=>updateChoiceDate()}>Update</button>
                    </div>
                </div>
                <button className="btn btn-primary mt-10 w-48" onClick={()=>{setResetConfirmationModal(true)}}>Reset Finalize</button>
        </div>
    )
}

export default ViewSnP