"use client"

import { useRouter } from 'next/navigation';

const HomePage = () => {
    
    const router = useRouter();

    return (
        <div className="bg-green-100 min-h-screen">
            This is home page 

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-base-200 ">

                
                    <div className="bg-base-300 ml-10 card shadow-xl flex-auto p-3">
                        <h1 className="">Your Test Schedule</h1>
                        <hr className="border-1 border-black" />
                        <div>
                        <div className="">
                            <table className="table w-full">
                                {/* head */}
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Agenda</th>
                                    <th>Date</th>
                                    <th>Shift</th>
                                    <th>Room</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <th>1</th>
                                        <td>Interview</td>
                                        <td>2023 May 22</td>
                                        <td>Blue</td>
                                        <td>626</td>
                                    </tr>
                                    {/* row 2 */}
                                    <tr>
                                        <th>2</th>
                                        <td>DBA Technical Test</td>
                                        <td>2023 May 22</td>
                                        <td>Purple</td>
                                        <td>610</td>
                                    </tr>
                            
                                </tbody>
                            </table>
                            </div>
                        </div>
                    
                    </div>
                </div>

                <div className="bg-base-200 mr-10">
                    <div className="bg-base-300 ml-10 card shadow-xl flex-auto p-3">
                        <h1 className="">Announcements</h1>
                        <hr className="border-1 border-black"/>
                        <div className="mt-2">
                            <h1 className="bold">Announcement 1</h1>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, eveniet magni iure natus autem neque quibusdam sed, id laborum, accusamus modi dolor beatae. Nulla quaerat, asperiores perspiciatis voluptates adipisci repellat.</p>
                            <hr className="border-1 border-black mt-2"/>
                        </div>
                        <div className=" mt-2">
                            <h1 className="bold">Announcement 2</h1>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, eveniet magni iure natus autem neque quibusdam sed, id laborum, accusamus modi dolor beatae. Nulla quaerat, asperiores perspiciatis voluptates adipisci repellat.</p>
                            <hr className="border-1 border-black mt-2"/>
                        </div> 
                        <div className=" mt-2">
                            <h1 className="bold">Announcement 3</h1>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam, eveniet magni iure natus autem neque quibusdam sed, id laborum, accusamus modi dolor beatae. Nulla quaerat, asperiores perspiciatis voluptates adipisci repellat.</p>
                            <hr className="border-1 border-black mt-2"/>
                        </div>
                    </div>
                   

                </div>
            </div>

            <button className="btn btn-primary w-32" onClick ={()=>{router.push('/promotion/register')}}>Register Promotion</button>

            

        </div>
    )



}   
export default HomePage
