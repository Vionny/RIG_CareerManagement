'use client'
import "@/app/globals.css"
import { useEffect, useState } from "react";

const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const EditAssistantModal = ({assistant, closeModal}) => {

    
    const [name, setName] = useState();
    const [role, setRole] = useState();
    const [initial, setInitial] = useState();
    const [leader, setLeader] = useState(null);
    const [careerChoice, setCareerChoice] = useState();
    const [eligibleResign, setEligibleResign] = useState();
    const [eligiblePromotion, setEligiblePromotion] = useState();
  

    useEffect(()=>{
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getUser/' + assistant).then((res) => {
          console.log(res.data[0]);
          setInitial(res.data[0].initial)
          setLeader(res.data[0].assistantleader);
          setName(res.data[0].assistantname);
          setCareerChoice(res.data[0].careerchoice);
          setEligibleResign(res.data[0].eligibleforresign);
          setEligiblePromotion(res.data[0].eligiblepromotionstatus);
          
        })
    
      },[assistant])

    const updateAssistant = () =>{
      // console.log(startPromotion);
      // console.log(endPromotion);
  
      var data = {
        eligiblepromotionstatus: eligiblePromotion,
        eligibleforresign: eligibleResign,
        initial: assistant
  
      }
      console.log(data);
      axios
      .post(process.env.NEXT_PUBLIC_BACKEND_URL + '/updateAssistant', data)
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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
        <div className="modal-box">
          {/* <div className="flex flex-col"> */}
            <h3 className="font-bold text-lg mb-3">Edit Assistant</h3>

            <button className="btn btn-sm  btn-error absolute right-2 top-2" onClick={closeModal}>✕</button>
            <div>   
          {/* </div> */}
            <div className="flex flex-col gap-5">
              
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold">{initial}</h3>
                <h3 className="text-lg font-semibold">{name}</h3>
              </div>
                
              <div className="flex flex-row gap-5">
                
                <div className="card  w-52 flex ">
                    <h3 className="text-lg font-semibold">Leader</h3>
                    <input type="text" className="input input-bordered w-full max-w-xs " placeholder={leader==null ? "-" : leader} onChange={e => setLeader(e.target.value)}/>
                </div>
                <div className="card bg-base-100 w-52 flex">
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
                    <select
                      className="select w-full max-w-xs bg-base-200" 
                      value={eligiblePromotion}
                      onChange={(e) => {
                        setEligiblePromotion(e.target.value);
                      }}
                      
                    >
                      <option value = {true} >Eligible</option>
                      <option value = {false}>Not Eligible</option>
                    </select>
                    
                </div>
                <div className="card bg-base-100 w-52 flex">
                    <h3 className="text-lg font-semibold">Eligible For Resign</h3>
                    <select
                      className="select w-full max-w-xs bg-base-200" 
                      value={eligibleResign}
                      onChange={(e) => {
                        e.target.value == "true" ? setEligibleResign(true) : setEligibleResign(false);
                        
                      }}
                      
                    >
                      <option value={true}>Eligible</option>
                      <option value={false}>Not Eligible</option>
                    </select>
                </div>


              </div>

            </div>
            <button className="btn btn-primary mt-5 " onClick={()=>updateAssistant()}>Update</button>

        </div>
        </div>

    </div>
  );
  };
  