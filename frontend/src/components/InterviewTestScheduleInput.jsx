import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SimpleInformationModal from './Modals/Information/SimpleInformationModal';
const axios = require('axios');

const InterviewTestScheduleInput = () => {

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');
    const [showDropdown, setShowDropdown] = useState(false)
    const [showInfoModal, setShowInfoModal] = useState()
    const [title,setTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [currSemester,setCurrSemester] = useState(sessionStorage.getItem('selectedSemester'))
    const [BATest,setBATest] = useState()
    const [loadBATest,setLoadBATest] = useState(false)
    const [registrees, setRegistrees] = useState()
    const [loadRegistrees, setLoadRegistrees] = useState()
    const [selectedRegistrees, setSelectedRegistrees] = useState()
    const [selectedRole,setSelectedRole] = useState()
    const [room,setRoom] = useState()
    const [role,setRole] = useState()
    const [interviewers,setInterviewers] = useState()
    const [selectedInterviewer,setSelectedInterviewer] = useState()
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };

    
  useEffect(() => {
    if (currSemester) {
        axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/promotion/getRegistrees/'+sessionStorage.getItem('selectedSemester')).then((res)=>{
            console.log(res.data)
            setRegistrees(res.data)
            axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'/getInterviewer').then((res)=>{
                setInterviewers(res.data)
                setLoadRegistrees(true)
            })
        })
    }
  }, [currSemester,loadRegistrees]);
  
  useEffect(() => {
    if(selectedRegistrees){
        axios.get(
            process.env.NEXT_PUBLIC_BACKEND_URL +
              '/getRoleNotInserted/' +
              sessionStorage.getItem('selectedSemester') +
              '/' +
              selectedRegistrees
          ).then((res) => {
              setRole(res.data);
        });
    }
      
  }, [selectedRegistrees]);
  
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    console.log(e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(date,time)
    const timestamp = new Date(date);
    const timeParts = time.split(':');
    timestamp.setHours(parseInt(timeParts[0], 10)+7);
    timestamp.setMinutes(parseInt(timeParts[1], 10));
    timestamp.setSeconds(0);
    const toInsert = new Date(timestamp);
    const stamp = toInsert.toISOString().slice(0, 19).replace('T', ' ');    
    console.log(stamp)

    var data = {
        initial : sessionStorage.getItem('initial'),
        interviewer : selectedInterviewer,
        semesterid : sessionStorage.getItem('selectedSemester').trim(),
        interviewdate : stamp.toString(),
        roleid : selectedRole,
        interviewroom : room

      };

      console.log(data);
      axios
        .post(process.env.NEXT_PUBLIC_BACKEND_URL + '/InterviewTestInputHandler', data)
        .then((res) => {
          console.log(res);
          if (res.data === 'Success') {
            setTitle('Successful')
            setModalMessage('You have successfully inserted the BA Test Schedule')
            setShowInfoModal(true)
          }else if(res.data ==='Update'){
            setTitle('Successful')
            setModalMessage('You have successfully updated the BA Test Schedule')
            setShowInfoModal(true)
          }
        })
        .catch((error) => {
          console.error(error);
        });
  };
  const refreshPage = ()=>{
        
    setShowInfoModal(false)
    window.location.reload()
  }

  if(!loadRegistrees) return <div></div>
  else return (
    <div>
      {showInfoModal && (<SimpleInformationModal
                  title="Successful"
                  message = {"You have successfully inserted " + selectedRegistrees +" interview schedule with "+selectedInterviewer}
                  onConfirm = {refreshPage}
              />)}
      <form onSubmit={handleSubmit}>
      <div className="card w-full bg-base-100 shadow-xl mt-7">
        <div className="card-body">
            <h2 className="">Interview Test Schedule</h2>
            <div className="flex flex-row mt-3 min-w-full">
                <div className="dropdown justify-start w-fit">
                    <select className="btn btn-ghost bg-base-100 w-32 flex justify-start normal-case  text-base  "  value={(selectedRegistrees ? selectedRegistrees : "Choose Registrees")} onChange={(event) => {
                        // console.log(event.target.value)
                        setSelectedRegistrees(event.currentTarget.value)
                        }}>
                        {
                            registrees.map((reg,index)=>{
                            return <option className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full h-max" key={index} value={reg.initial}>{reg.initial}</option>
                        })
                        }
                    </select>
                </div>
                <div className="dropdown justify-start w-56">
                {interviewers&& (<select className="btn btn-ghost bg-base-100 w-72 ml-20 flex justify-start normal-case  text-base"  value={(selectedInterviewer ? selectedInterviewer.interviewersname : "Choose Interviewers")} onChange={(event) => {
                        setSelectedInterviewer(event.currentTarget.value)
                        }}>
                        {
                            interviewers.map((r,index)=>{
                            return <option className="dropdown-content menu p-2 text-center shadow bg-base-100 rounded-box w-full h-max" key={index} value={r.initial}>{r.assistantname}</option>
                        })
                        }
                </select>)}
                {role&& (<select className="btn btn-ghost bg-base-100 w-72  flex justify-start normal-case  text-base"  value={(selectedRole ? selectedRole.rolename : "Choose Role")} onChange={(event) => {
                        // console.log(event.target.value)
                        setSelectedRole(event.currentTarget.value)
                        }}>
                        {
                            role.map((r,index)=>{
                            return <option className="dropdown-content menu p-2 text-center shadow bg-base-100 rounded-box w-full h-max" key={index} value={r.roleid}>{r.rolename}</option>
                        })
                        }
                </select>)}

                
                </div>
            </div>
            
            <div className="flex flex-row mt-3">
                <div>
                    <label className='text-lg mr-10'>Date</label>
                    <DatePicker className="border-gray-400 input w-full max-w-xs"
                        selected={date}
                        onChange={handleDateChange}
                    />
                </div>
                <div className="flex flex-row ml-20">
                    <label className='text-lg self-center mr-10'>Time:</label>
                    <input type="time" className="border-gray-400 input w-full max-w-xs" value={time} onChange={handleTimeChange} />
                </div>
                <div className="flex flex-row ml-20">
                    <label className='text-lg self-center mr-10'>Room</label>
                    <input type="text" className="border-gray-400 input w-20 max-w-xs"  onChange={(e)=>{setRoom(e.target.value)}} />
                </div>
            </div>
            
            <div className="card-actions justify-end mt-5">
                <button  type="submit" className="btn btn-primary">Insert Interviewer Schedule</button>
            </div>
        </div>
    </div>
      </form>
      {message && 
      <div id="toast-danger" className="toast toast-danger mr-7 z-50 flex flex-row items-center w-full max-w-xs p-4 mb-7 text-gray-500 bg-red-400 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">                 
            <div className="ml-3 font-normal text-white text-lg">{message}</div>
            <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-red-200 text-black hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-red-400" data-dismiss-target="#toast-danger" aria-label="Close" onClick={()=>{setMessage("")}}>
                <span className="sr-only">Close</span>
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
        </div>}
    </div>
  );
};

export default InterviewTestScheduleInput;
