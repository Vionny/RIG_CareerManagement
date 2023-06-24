'use client'
import "@/app/globals.css"
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';


export const EditSemesterModal = ({semesterid, closeModal}) => {

  //date
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(()=>{
    axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getSemesterDate/' + semesterid).then((res) => {
      // console.log(res.data[0])
      // console.log(res.data[0].semesterenddate)
      setStartDate(new Date(res.data[0].semesterstartdate)) 
      setEndDate(new Date(res.data[0].semesterenddate))
      // setLoadSem(true)
    })

    // setCurrSemesters(sessionStorage.getItem('selectedSemester'))
    // console.log("curr smt" +currSemester);
  },[semesterid])


  const updateSemesterDate = () =>{
    // console.log(startPromotion);
    // console.log(endPromotion);

    var data = {
      semesterstartdate: startDate,
      semesterenddate: endDate,
      semesterid: semesterid

    }
    console.log(data);
    axios
    .post(process.env.NEXT_PUBLIC_BACKEND_URL + '/updateSemester', data)
    .then((res) =>{
        console.log(res)
        if(res.data== 'Success'){

            window.location.reload();
           
          }
    })
    .catch((error)=>{
        console.error(error)
    })

  }
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 ">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Semester</h3>
        <p className="py-4">Edit Semester2</p>
        <div className="flex flex-row gap-5">

          <div className="card bg-base-100 w-48 flex p-3">
              <h3 className="text-lg font-semibold">Start Date</h3>
              <DatePicker className="w-32" selected={startDate} value={startDate} onChange={(startDate) => setStartDate(startDate)} />                
          </div>

          <div className="card bg-base-100 w-48 flex p-3">
              <h3 className="text-lg font-semibold">End Date</h3>
              <DatePicker className="w-32" selected={endDate} value={endDate} onChange={(endDate) => setEndDate(endDate)} />                
          </div>

          <button className="btn btn-primary" onClick={()=>updateSemesterDate()}>Update</button>
        </div>

        <button className="btn" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
  };
  