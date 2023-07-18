'use client'
import "@/app/globals.css"
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const AddSemesterModal = ({closeModal}) => {
    //date
    const [semesterid, setSemesterId] = useState();
    const [semesterName, setSemesterName] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [errText, setErrText] = useState("");

    useEffect(()=>{       

        // handleEndDate();
        // handleStartDate();
    },[])


    function handleEndDate() {
        // console.log(res)
        // console.log()
        if (endDate !== null ) {
            setEndDate(endDate); 
          } else {
            setEndDate(new Date()); 
          }
    }

    function handleStartDate() {
        // console.log(res)
        // console.log()
        if (startDate !=startDate){
          } else {
            setStartDate(new Date()); 
          }
    }


    const insertSemester = () => {
        // if(semesterid == null || semesterid.length == 0) setErrText("Please input period field")
        // else if(semesterName == null) setErrText("Please input semester name")
        // else {
        const currentDate = new Date();
        if(semesterid == null){
          setErrText("Please input the semesterid")
        }else if((semesterid.substring(0,4) !=='EVEN' && semesterid.substring(0,3) !=='ODD') || isNaN(parseInt(semesterid.substring(semesterid.length-4,semesterid.length))) || semesterid.length<7 ||semesterid.length>8){
          setErrText("Please input the correct format for semester id")
        }else if(semesterName == null){
          setErrText("Please input the semester name")
        }else if(startDate < currentDate){
          setErrText("You have to choose date more than today !")
        }else if (startDate > endDate){
          setErrText("End date must be more than start date !")
        }else{
          var data = {
            semesterid: semesterid,
            semestername: semesterName,
            semesterstartdate: startDate,
            semesterenddate: endDate
          };
          
          console.log(data)
          axios
            .post(process.env.NEXT_PUBLIC_BACKEND_URL + '/insertSemester', data)
            .then((res) => {
              console.log(res);
              if(res.data== 'Success'){
                window.location.reload();
              }else if(res.data == "Exist"){
                setErrText("ID already exists")
              }
            })
            .catch((error) => {
              console.error(error);
            });

        }
        
    }

    return(
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 ">
      <div className="modal-box h-96">
        <h3 className="font-bold text-lg">Add Semester</h3>
        <button className="btn btn-sm  btn-error absolute right-2 top-2" onClick={closeModal}>✕</button>
        

          <div className="flex flex-row gap-2">

          <input onChange={(e)=>{setSemesterId(e.target.value)}} type="text" placeholder="[EVEN/ODD][2223]" className="input input-bordered w-full max-w-xs" />
          <input onChange={(e)=>{setSemesterName(e.target.value)}} type="text" placeholder="Semester Name" className="input input-bordered w-full max-w-xs" />
          </div>
          
        <div className="flex flex-row gap-5">

          <div className="card bg-base-100 w-full flex p-3">
              <h3 className="text-lg font-semibold">Start Date</h3>
              <DatePicker className="w-32" selected={startDate} value={startDate} onChange={(startDate) => setStartDate(startDate)} />                
          </div>

          <div className="card bg-base-100 w-full flex p-3">
              <h3 className="text-lg font-semibold">End Date</h3>
              <DatePicker className="w-32" selected={endDate} value={endDate} onChange={(endDate) => setEndDate(endDate)} />                
          </div>

        </div>
          <button className="btn btn-primary" onClick={()=>insertSemester()}>Add</button>
          {errText && 
          <div id="toast-danger" className="toast toast-danger mr-7 z-50 flex flex-row items-center w-full max-w-xs p-4 mb-7 text-gray-500 bg-red-400 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">                 
                <div className="ml-3 font-normal text-white text-lg">{errText}</div>
                <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-red-200 text-black hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-red-400" data-dismiss-target="#toast-danger" aria-label="Close" onClick={()=>{setErrText("")}}>
                    <span className="sr-only">Close</span>
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>}
        
      </div>
    </div>
    )

}