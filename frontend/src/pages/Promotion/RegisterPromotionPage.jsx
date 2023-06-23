"use client"
import "@/app/globals.css"
import { UserContext } from "@/components/UserContext"
import { useRouter } from "next/navigation"
import {useContext, useEffect, useState} from 'react'
const axios = require("axios")
axios.defaults.headers.post['Content-Type'] = 'application/json';

const RegisterPromotionPage = ()=>{
    const router = useRouter()

    const [division,setDivision] = useState({})
    const [loadRole,setLoadRole] = useState(false)
    const [selectedDivision, setSelectedDivision] = useState();
    const [roles,setRoles] = useState();
    const [selectedRole, setSelectedRole] = useState();
    const [priority, setPriority] = useState()
    const [periodInput, setPeriodInput] = useState()
    const [reasonInput, setReasonInput] = useState()
    const { user } = useContext(UserContext);
    const [errText, setErrText] = useState("")
    const [promotion,setPromotion] = useState({})
    const currentDate = new Date();
    const currentFormattedDate = currentDate.toISOString().split('T')[0];
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const btnActive = false;
    const options = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    };

    async function getDivision(divisionid) {
        await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/getDivisionByRole/' + divisionid).then((res) => {
            setDivision(res.data[0]);
        });
    }
    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/getAstRegisteredRole/' + sessionStorage.getItem('initial') + '/' + sessionStorage.getItem('selectedSemester')).then(async (res) => {
            setRoles(res.data);
            setLoadRole(true)
            console.log(user)
            if(user){
                if(user.eligiblepromotionstatus){

                    axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/getSelectedSemester/' + sessionStorage.getItem('selectedSemester')).then((res) => {
                        console.log(res.data[0])
                        if(res.data[0].promotionenddate !== null || res.data[0].promotionstartdate!== null){
                            const promotionstart = new Date(res.data[0].promotionstartdate);
                            const promotionend = new Date(res.data[0].promotionenddate);
                
                            // console.log({promotionstart,promotionend,currentDate});
                            if (promotionstart > currentDate) {
                                // console.log("start")
                                setTitle("Promotion Not Yet Started!");
                                setMessage("Promotion will start on " + promotionstart.toLocaleDateString('en-US', options));
                            } else if (promotionend < currentDate) {
                                setTitle("Promotion Ended!");
                                setMessage("Promotion ended on " + promotionend.toLocaleDateString('en-US', options));
                            }
                            // console.log(message);
                        }
                    });
                    if(message == ""){
                        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/promotion/getLastPriorityInsert/' + sessionStorage.getItem('initial') + '/' + sessionStorage.getItem('selectedSemester')).then((res) => {
                            if (res.data === 0) {
                                setPriority(1);
                            } else {
                                setPriority(res.data[0].priority + 1);
                                if (priority > 3) {
                                    console.log(priority)
                                    setTitle("Limit Reached!");
                                    setMessage("You have reached the limit of registration!");
                                }
                            }
                        });
                    }
                }else{
                    setTitle('Not Eligible');
                    setMessage('You are not eligible for this promotion')
                }

            }
        
        });
    }, [loadRole,user]);

    const insertPromotion = () => {
        if(periodInput == null || periodInput.length == 0) setErrText("Please input period field")
        else if(selectedRole == undefined) setErrText("Please choose a role to register")
        else if(reasonInput == null || reasonInput.length == 0) setErrText("Please input reason field")
        else if(isNaN(periodInput)) setErrText("Period must be numeric")
        else {
            var data = {
                initial: sessionStorage.getItem('initial'),
                semesterid: sessionStorage.getItem('selectedSemester'),
                roleid: selectedRole.roleid,
                priority: priority,
                registrationreason: reasonInput,
                iscandidate: false,
                period: periodInput,
              };
              
              console.log(data)
              axios
                .post(process.env.NEXT_PUBLIC_BACKEND_URL + '/promotion/registerPromotion', data)
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
       
      };
      


    if(!loadRole) return <div></div>
    else{
        if(message !== ""){
            return (
                <div className="hero min-h-screen bg-slate-200">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                        <div className="card w-100 bg-red-100 text-primary-content border border-red-500 shadow-xl shadow-slate-500">
                            <div className="card-body  ">
                                <h2 className="card-title mb-5 font-bold text-red-500">{title}</h2>
                                <p className="text-black mb-5 text-lg">{message}</p>
                                <div className="card-actions justify-end mt-3">
                                    <button className="btn bg-red-50 btn-error" onClick={()=>{
                                        router.push('/home')
                                    }}>Go back to home</button>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            )
        }else
        return(
            <div className=" pl-10 pr-10 py-5 bg-base-200 min-h-full w-full ">
    
                <article className="prose base mb-5">
                    <h2>Promotion Registration for Even 2022/2023</h2>
                </article>
                {errText && (
                    <div id="toast-danger" className="toast toast-danger z-50 flex flex-row items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-red-400 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                        
                        <div className="ml-3 font-normal text-white text-lg">{errText}</div>
                        <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-red-200 text-black hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-red-400" data-dismiss-target="#toast-danger" aria-label="Close" onClick={()=>{setErrText("")}}>
                            <span className="sr-only">Close</span>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
                )}

                <div className="alert bg-red-200 shadow-lg mb-5">
                    <div>
                        <span className="font-bold text-red-800">You can only choose 3, so think wisely. </span>
                    </div>
                </div>
                <div className="flex flex-row gap-x-5 mb-5">
                    <div className="rounded-md flex items-center p-3 bg-slate-300 w-1/4 h-12">
                        <h2 className="card-title ">Priority {
                           (priority == undefined ? "0" : priority)
                        }</h2>    
                    </div>
    
                    <div className="dropdown w-1/4">
                        <input onChange={(e)=>{setPeriodInput(e.target.value)}} type="text" placeholder="Period" className="input input-bordered w-full max-w-xs" />
                    </div>
    
                    <div className="dropdown justify-start w-2/4">
                        <label tabIndex={0} className="btn btn-ghost bg-base-100 flex justify-start  normal-case card-title ">{(selectedRole !== undefined ? selectedRole.rolename : "Choose Role")}</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full h-max">
                            {
                                roles.map((role,index)=>{
                                    return(<li key={index} onClick={()=>{
                                        setSelectedRole(role)
                                        getDivision(role.divisionid)
                                    }}><a className="h-8">{role.rolename}</a></li>)
                                })
                            }
                        </ul>
                    </div>
                </div>
    
                <div className="card bg-base-100  flex-auto h-96 ">
                    <div className="card-body flex flex-col">
                        <h2 className="card-title ">Reason :</h2>
                        <textarea onChange={(e)=>{setReasonInput(e.target.value)}} className="textarea-md w-full h-64 resize-none bg-base-200" placeholder="My reason is..."></textarea>
                    </div>
                </div>   
                
                
    
                <div className="flex justify-end my-5">
                    <button onClick={()=>insertPromotion()} className="btn btn-primary w-32 mr-3" >Submit</button>
                </div>
    
                <div className="flex flex-row gap-x-5">
                    <div className="card bg-base-100 w-3/5">
                        <div className="card-body ">
                            <h2 className="card-title">{(selectedRole !== undefined ? selectedRole.rolename : "")}</h2>
                            {(selectedRole !== undefined ? <p>{selectedRole.rolerequirements}</p> : <p></p>)}
                        </div>
                    </div>
    
                    <div className="card bg-base-100 z-0 w-2/5">
                        <div className="card-body ">
                            <h2 className="card-title">{(division !== undefined) ? <p>{division.divisionname}</p> : <p></p>}</h2>
                            <div>
                                    <h2>Division Desciption</h2>
                                    {(division !== undefined) ? <p>{division.divisiondescription}</p> : <p></p>}
                                
                            </div>
                            
                        </div>
                    </div>
    
    
                </div>
                
                
    
    
            </div>
    
        )
    }
    
}

export default RegisterPromotionPage