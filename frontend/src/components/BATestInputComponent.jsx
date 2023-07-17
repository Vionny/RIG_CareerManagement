"use client"
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SimpleInformationModal from './Modals/Information/SimpleInformationModal';
const axios = require('axios');

const BATestInputComponent = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const [showInfoModal, setShowInfoModal] = useState()
  const [title,setTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [currSemester,setCurrSemester] = useState(sessionStorage.getItem('selectedSemester'))
  const [BATest,setBATest] = useState()
  const [loadBATest,setLoadBATest] = useState(false)

  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };


  useEffect(() => {
    if (currSemester) {
      axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/getBATestSchedule/' + currSemester)
        .then((res) => {
          console.log(res);
          if (res.data[0]) {
            const batestDateTimeString = res.data[0].batestdate;
            const batestDateTime = new Date(batestDateTimeString);

            if (!isNaN(batestDateTime)) {
              setDate(batestDateTime);

              const hours = batestDateTime.getHours() ;
              const minutes = batestDateTime.getMinutes();
              const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

              setTime(formattedTime);

              setBATest({
                date : batestDateTime,
                time: formattedTime
              })
            } else {
              console.error('Invalid batestdate:', batestDateTimeString);
            }



          }
          setLoadBATest(true);
        })
        .catch((error) => {
          console.error(error);
          setLoadBATest(true);
        });
    }
  }, [currSemester]);
  

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
        semesterid : sessionStorage.getItem('selectedSemester').trim(),
        batestdate : stamp.toString()
      };

      console.log(data);
      axios
        .post(process.env.NEXT_PUBLIC_BACKEND_URL + '/BATestHandler', data)
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

  if(!loadBATest) return <div></div>
  else return (
    <div>
      {showInfoModal && (<SimpleInformationModal
                  title="Successful"
                  message = "You have successfully updated your BA Test !"
                  onConfirm = {refreshPage}
              />)}
      <form onSubmit={handleSubmit}>
      <div className="card w-full bg-base-100 shadow-xl mt-7">
        <div className="card-body">
            <h2 className="card-title">BA Test Schedule</h2>
            <label className="card-title text-lg font-normal mt-5">Current Date : {BATest ? BATest.date.toLocaleDateString('en-GB', options) : ''}  {BATest ? 'at' +BATest.time : ''}</label>
            <div className="flex flex-row mt-3">
                <div>
                    <label className='text-lg mr-10'>Date</label>
                    <DatePicker className="border-gray-400 input w-full max-w-xs"
                    value={date}
                        selected={date}
                        onChange={handleDateChange}
                    />
                </div>
                <div className="flex flex-row ml-20">
                    <label className='text-lg self-center mr-10'>Time:</label>
                    <input type="time" className="border-gray-400 input w-full max-w-xs" value={time} onChange={handleTimeChange} />
                </div>
            </div>
            
            <div className="card-actions justify-end mt-5">
                <button  type="submit" className="btn btn-primary">Update Schedule</button>
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

export default BATestInputComponent;
