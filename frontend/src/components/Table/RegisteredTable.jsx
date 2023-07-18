'use client'

import { useEffect, useState } from "react"
const axios = require('axios')
const RegisteredTable = ()=>{

    const [loadSchedule,setLoadSchedule]= useState(false)
    const [schedule,setSchedule] = useState()

    useEffect(()=>{
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/getSchedule/'+sessionStorage.getItem('selectedSemester')+'/'+sessionStorage.getItem('initial')).then((res)=>{
            console.log(res.data)
            setSchedule(res.data)
            setLoadSchedule(true)
        })
    },[loadSchedule])
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };

    if (schedule && schedule.length > 0) {
        return (
          <div className="bg-base-400 w-full  mt-5">
            <div className="bg-base-100 card shadow-xl w-full flex-auto p-5 px-7">
              <h1 className="card-title mb-2">Interview Schedule</h1>
              <hr className="border-1 border-black" />
              <div>
                <div className="max-h-80 overflow-auto">
                  <table className="table w-full table-compact">
                    <thead>
                      <tr>
                            <th className="sticky top-0 py-2 text-center">Role</th>
                            <th className="sticky top-0 py-4 text-center">Date</th>
                            <th className="sticky top-0 py-4 text-center">Time</th>
                            <th className="sticky top-0 py-4 text-center">Room</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((a, index) => {
                        const scheduleDate = new Date(a.interviewdatetime);
                        const hours = scheduleDate.getHours();
                        const minutes = scheduleDate.getMinutes();
                        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
                        return (
                          <tr key={index}>
                            <td>{a.rolename}</td>
                            <td>{scheduleDate.toLocaleDateString('en-GB', options)}</td>
                            <td>{formattedTime}</td>
                            <td>{a.interviewroom}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return <div>No schedule available.</div>;
      }
      

}

export default RegisteredTable