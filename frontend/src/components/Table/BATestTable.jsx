'use client'
const axios = require('axios')
import { useEffect, useState } from "react";

const BATestTable = ()=>{

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [date2, setDate2] = useState(new Date());
    const [time2, setTime2] = useState('');
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
                const batestDateTimeString2 = res.data[0].batestenddate;
                const batestDateTime2 = new Date(batestDateTimeString2);

                if (!isNaN(batestDateTime)) {
                setDate(batestDateTime);
                setDate2(batestDateTime2)
                const hours = batestDateTime.getHours() ;
                const minutes = batestDateTime.getMinutes();
                const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

                setTime(formattedTime);
                const hours2 = batestDateTime2.getHours() ;
                const minutes2 = batestDateTime2.getMinutes();
                const formattedTime2 = `${hours2.toString().padStart(2, '0')}:${minutes2.toString().padStart(2, '0')}`;

                setTime2(formattedTime);
                setBATest({
                    date : batestDateTime,
                    time: formattedTime,
                    enddate : batestDateTime2,
                    endTime : formattedTime2
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
    if(!loadBATest) return <div></div>
    else 
    return (
        <div className="card w-full bg-base-100 shadow-xl mt-5 ">
            <div className="card-body">
                <h2 className="card-title">BA Test Schedule</h2>
                <label className="card-title text-lg font-normal mt-5"> {BATest ? BATest.date.toLocaleDateString('en-GB', options) : ''}  {BATest ? 'at ' +BATest.time : ''} {BATest ? ' - ' +BATest.enddate.toLocaleDateString('en-GB', options) : ''}  {BATest ? 'at ' +BATest.endTime : ''}</label>
                
            </div>
        </div>
    )
}

export default BATestTable