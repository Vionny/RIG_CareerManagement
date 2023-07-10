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
              }
            })
            .catch((error) => {
              console.error(error);
            });

    }

    return(
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 ">
      <div className="modal-box h-96">
        <h3 className="font-bold text-lg">Add Semester</h3>
        <button className="btn btn-sm  btn-error absolute right-2 top-2" onClick={closeModal}>✕</button>
        

          <div className="flex flex-row gap-2">

          <input onChange={(e)=>{setSemesterId(e.target.value)}} type="text" placeholder="Semester ID" className="input input-bordered w-full max-w-xs" />
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

        
      </div>
    </div>
    )

}