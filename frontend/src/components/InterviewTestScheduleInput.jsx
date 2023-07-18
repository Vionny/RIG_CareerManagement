import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SimpleInformationModal from './Modals/Information/SimpleInformationModal';
import axios from 'axios';

const InterviewTestScheduleInput = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [registrees, setRegistrees] = useState([]);
  const [selectedRegistrees, setSelectedRegistrees] = useState('');
  const [role, setRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [room, setRoom] = useState('');
  const [semester, setSemester] = useState('');
  const [loadRegistrees, setLoadRegistrees] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('selectedSemester')) {
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/promotion/getRegistrees/${sessionStorage.getItem('selectedSemester')}`)
        .then((res) => {
          setRegistrees(res.data);
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getSelectedSemester/${sessionStorage.getItem('selectedSemester')}`)
            .then((res) => {
              setSemester(res.data[0]);
              setLoadRegistrees(true);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    if (selectedRegistrees) {
      axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRoleNotInserted/${sessionStorage.getItem('selectedSemester')}/${selectedRegistrees}`)
        .then((res) => {
          setRole(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedRegistrees]);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRole || !selectedRegistrees) {
      setMessage('Select the registrees and role!');
    } else if (!time) {
      setMessage('Choose the time!');
    } else if (!room) {
      setMessage('Input the room!');
    } else if (room.toString().length !== 3) {
      setMessage('Room must be according to format: [0-9][0-9][0-9]');
    } else {
      const timestamp = new Date(date);
      const timeParts = time.split(':');
      timestamp.setHours(parseInt(timeParts[0], 10) + 7);
      timestamp.setMinutes(parseInt(timeParts[1], 10));
      timestamp.setSeconds(0);
      const toInsert = new Date(timestamp);
      const stamp = toInsert.toISOString().slice(0, 19).replace('T', ' ');

      const semesterStartDate = new Date(semester.semesterstartdate);
      const semesterEndDate = new Date(semester.semesterenddate);

      if (semesterStartDate > toInsert || semesterEndDate < toInsert) {
        setMessage('Interview Date must be within the semester period!');
      } else {
        const data = {
          initial: selectedRegistrees,
          semesterid: sessionStorage.getItem('selectedSemester').trim(),
          interviewdate: stamp.toString(),
          roleid: selectedRole,
          interviewroom: room,
        };

        axios
          .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/InterviewTestInputHandler`, data)
          .then((res) => {
            if (res.data === 'Success') {
              setShowInfoModal(true);
            } else if (res.data === 'Update') {
              setShowInfoModal(true);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  const refreshPage = () => {
    setShowInfoModal(false);
    window.location.reload();
  };

  if (!loadRegistrees) return null;

  return (
    <div>
      {showInfoModal && (
        <SimpleInformationModal
          title="Successful"
          message="You have successfully inserted an interview schedule"
          onConfirm={refreshPage}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="card w-full bg-base-100 shadow-xl mt-7">
          <div className="card-body">
            <h1 className="card-title">Interview Test Schedule</h1>
            <div className="inline-flex flex-row mt-3 min-w-full">
              <div className="dropdown justify-start w-fit">
                <select
                  className="btn btn-ghost bg-base-100 w-32 flex justify-start normal-case text-base"
                  value={selectedRegistrees}
                  onChange={(event) => setSelectedRegistrees(event.target.value)}
                >
                  <option value="">Choose Registrees</option>
                  {registrees.map((reg, index) => (
                    <option className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full h-max" key={index} value={reg.initial}>{reg.initial}</option>
                  ))}
                </select>
              </div>
              <select
                className="btn btn-ghost bg-base-100 w-72 ml-5 justify-start normal-case text-base"
                value={selectedRole}
                onChange={(event) => setSelectedRole(event.target.value)}
              >
                <option value="">Choose Role</option>
                {role.map((r, index) => (
                  <option className="dropdown-content menu p-2 text-center shadow bg-base-100 rounded-box w-full h-max" key={index} value={r.roleid}>{r.rolename}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-row mt-3">
              <div>
                <label className="text-lg mr-10">Date</label>
                <DatePicker
                  className="border-gray-400 input w-full max-w-xs"
                  selected={date}
                  onChange={handleDateChange}
                />
              </div>
              <div className="flex flex-row ml-20">
                <label className="text-lg self-center mr-10">Time:</label>
                <input
                  type="time"
                  className="border-gray-400 input w-full max-w-xs"
                  value={time}
                  onChange={handleTimeChange}
                />
              </div>
              <div className="flex flex-row ml-20">
                <label className="text-lg self-center mr-10">Room</label>
                <input
                  type="text"
                  className="border-gray-400 input w-20 max-w-xs"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                />
              </div>
            </div>

            <div className="card-actions justify-end mt-5">
              <button type="submit" className="btn btn-primary">
                Insert Interviewer Schedule
              </button>
            </div>
          </div>
        </div>
      </form>
      {message && (
        <div
          id="toast-danger"
          className="toast toast-danger mr-7 z-50 flex flex-row items-center w-full max-w-xs p-4 mb-7 text-gray-500 bg-red-400 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="ml-3 font-normal text-white text-lg">{message}</div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-red-200 text-black hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-red-400"
            data-dismiss-target="#toast-danger"
            aria-label="Close"
            onClick={() => setMessage('')}
          >
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default InterviewTestScheduleInput;
