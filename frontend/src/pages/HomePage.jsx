"use client"
import "../app/globals.css"
import { useRouter } from 'next/navigation';

const HomePage = () => {
    
    const router = useRouter();

    return (
        <div className="bg-base-200 flex justify-center w-full min-h-screen">
                 <div className="bg-base-400 w-3/5 mt-5">

                    <div className="bg-base-100 card shadow-xl  w-full flex-auto p-3">
                        <h1 className="card-title mb-2">Your Test Schedule</h1>
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
                                    <th>Time</th>
                                    <th>Room</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <th>1</th>
                                        <td>Interview</td>
                                        <td>Monday, May 22nd, 2023</td>
                                        <td>12.00</td>
                                        <td>626</td>
                                    </tr>
                                    {/* row 2 */}
                                    <tr>
                                        <th>2</th>
                                        <td>DBA Technical Test</td>
                                        <td>Monday, May 22nd, 2023</td>
                                        <td>13.00</td>
                                        <td>610</td>
                                    </tr>
                            
                                </tbody>
                            </table>
                            </div>
                        </div>
                    
                    </div>
               
                 </div>
        </div>
    )



}   
export default HomePage
