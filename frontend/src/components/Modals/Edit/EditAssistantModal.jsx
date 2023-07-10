'use client'
import "@/app/globals.css"
import { useEffect, useState } from "react";

const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';


export const EditAssistantModal = ({assistant, closeModal}) => {

    
    const [name, setName] = useState();
    const [role, setRole] = useState();
    const [leader, setLeader] = useState(null);
    const [careerChoice, setCareerChoice] = useState();
    const [eligibleResign, setEligibleResign] = useState();
    const [eligiblePromotion, setEligiblePromotion] = useState();
  

    useEffect(()=>{
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getUser/' + assistant).then((res) => {
          console.log(res.data[0]);
          setLeader(res.data[0].assistantleader);
          setName(res.data[0].assistantname);
          setCareerChoice(res.data[0].careerchoice);
          setEligibleResign(res.data[0].eligibleforresign);
          setEligiblePromotion(res.data[0].eligiblepromotionstatus);
          
        })
    
      },[assistant])
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 w-full ">
        <div className=" bg-base-100 h-96   py-5 rounded-xl">
          {/* <div className="flex flex-col"> */}

            <button className="btn btn-sm  btn-error absolute " onClick={closeModal}>✕</button>
            <h3 className="font-bold text-lg">Edit Assistant</h3>
          {/* </div> */}
            <div className="flex flex-col gap-5">

            <div className="flex flex-row">
              
              <div className="card bg-slate-300 w-28 flex ">
                  <h3 className="text-lg font-semibold">Leader</h3>
                  <input type="text" className="input input-bordered w-full max-w-xs " placeholder={leader==null ? "-" : leader} onChange={e => setLeader(e.target.value)}/>
              </div>
              <div className="card bg-base-100 w-48 flex">
                <h3 className="text-lg font-semibold">Career Choice</h3>
               
                            <select className="select w-full max-w-xs bg-base-200" value={careerChoice} onChange={(e)=>{setCareerChoice(e.target.value)}} >
                                <option value="willing">Willing to Continue</option>
                                <option value="not willing">Not Willing to Continue</option>
                                <option value="tentative">Tentative</option>
                            </select>
                    
              </div>

            </div>

            <div className="flex flex-row gap-5">
            
              <div className="card bg-base-100 w-52 flex ">
                  <h3 className="text-lg font-semibold">Eligible For Promotion</h3>
                  
              </div>
              <div className="card bg-base-100 w-52 flex">
                  <h3 className="text-lg font-semibold">Eligible For Resign</h3>
                  
              </div>
            </div>

            </div>
            {/* <button className="btn btn-primary" onClick={()=>updateSemesterDate()}>Update</button> */}

            {/* <button className="btn" onClick={closeModal}>Close</button> */}
        </div>

    </div>
  );
  };
  