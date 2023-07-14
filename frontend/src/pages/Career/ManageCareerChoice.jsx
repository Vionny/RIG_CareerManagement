'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "@/app/globals.css";
import ManageCareerTable from '@/components/Table/ManageCareerTable';
import PieChart from '@/components/PieChart';
import RoleStatisticTable from '@/components/Table/RoleStatisticTable';

function ManageCareerChoice() {
    const [assistant, setAssistant] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [filtered, setFiltered] = useState(false);
    const [selectedOption, setSelectedOption] = useState("None");
    const [roleStatistics, setRoleStatistics] = useState(null);
    const [loadRoleStatistics, setLoadRoleStatistics] = useState(false);
    const [divisions, setDivisions] = useState([]);
    const [pieChartData, setPieChartData] = useState({});
    const [loadPieChartData, setLoadPieChartData] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getAllUser`)
        .then((res) => {
            setAssistant(res.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getAllDivision`)
        .then((res) => {
            setDivisions(res.data);
            setSelectedDivision(res.data[0]);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getRoleStatistics`)
            .then((res) => {
                setRoleStatistics(res.data);
                console.log(res.data);
                setLoadPieChartData(true);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
                setLoadRoleStatistics(true);
        });
    }, []);

    useEffect(() => {
        if (assistant) {
        if (selectedOption === "None" && keyword === "") {
            setFiltered(false);
        } else if (selectedOption === "None" && keyword !== "") {
            console.log("no selection option");
            setFilteredData(
            assistant.filter((assistant) => (
                    assistant.initial.toLowerCase().includes(keyword.toLowerCase()) ||
                    assistant.assistantname.toLowerCase().includes(keyword.toLowerCase()) ||
                    assistant.rolename.toLowerCase().includes(keyword.toLowerCase())
                ))
            );
            setFiltered(true);
        } else if (selectedOption !== "None" && keyword !== "") {
            console.log("filter and search");
            setFiltered(true);
            setFilteredData(
            assistant.filter((assistant) => (
                assistant.initial.toLowerCase().includes(keyword.toLowerCase()) ||
                assistant.assistantname.toLowerCase().includes(keyword.toLowerCase()) ||
                assistant.rolename.toLowerCase().includes(keyword.toLowerCase())
            )).filter((assistant) => assistant.initial.includes(selectedOption))
            );
        } else {
            setFiltered(true);
            setFilteredData(assistant.filter((assistant) => assistant.initial.includes(selectedOption)));
        }
        }
    }, [keyword, selectedOption, assistant]);

    useEffect(() => {
        if (roleStatistics && selectedDivision) {
            var willing = roleStatistics
            .filter((item) => item.divisionid.includes(selectedDivision.divisionid))
            .reduce((accumulator, currentItem) => parseInt(accumulator) + parseInt(currentItem.willing_count), 0);

            var notWilling = roleStatistics
            .filter((item) => item.divisionid.includes(selectedDivision.divisionid))
            .reduce((accumulator, currentItem) => parseInt(accumulator) + parseInt(currentItem.not_willing_count), 0);

            var tentative = roleStatistics
            .filter((item) => item.divisionid.includes(selectedDivision.divisionid))
            .reduce((accumulator, currentItem) => parseInt(accumulator) + parseInt(currentItem.tentative_count), 0);
            
            setPieChartData({
                willing : willing,
                notWilling : notWilling,
                tentative : tentative
            })
            console.log(pieChartData);
        }
    }, [loadPieChartData, selectedDivision])
        
    if (!loadRoleStatistics||!loadPieChartData) {
        return <div></div>;
    } else {
        return (
        <div className="bg-base-200 flex flex-col pl-10 pr-10 pt-5 w-full min-h-screen">
            <div className="h-max">
            <article className="prose base mb-5">
                <h2>Career Choice Management</h2>
            </article>

            <div className="bg-base-100 card shadow-xl w-full p-3" style={{ height: 470 }}>
                <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">Career Choice List</a>
                </div>
                <div className="flex-none">
                    <input
                    type="text"
                    placeholder="Search"
                    className="input input-bordered w-full max-w-xs"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
                </div>
                <hr className="border-1 border-black" />
                <div className="p-7">
                {assistant ? (
                    <ManageCareerTable assistant={filtered ? filteredData : assistant} />
                ) : null}
                </div>
            </div>
            </div>

            <div className="flex flex-row gap-x-5 mt-8" style={{ height: 470 }}>
            <div className="card bg-base-100 w-2/5">
                <div className="card-body">
                <div className="card-title bg-base-100 mb-10">
                    <div className="flex">
                        <a className="btn btn-ghost normal-case text-xl">Career Choice Statistic</a>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label
                        tabIndex={0}
                        className={`btn btn-info m-1 ml-20 w-56 ${isDropdownOpen ? 'active' : ''}`}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >{selectedDivision? selectedDivision.divisionname : ""}</label>
                        <ul tabIndex={0} className={`dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-96 max-h-64 overflow-y-scroll overflow-x-hidden flex-row flex ${ isDropdownOpen ? 'open' : '' }`} >
                            {divisions && divisions.map((division, index) => (
                            <li className='w-96 mr-4' key={index} onClick={() => {
                                setSelectedDivision(division);
                                setLoadPieChartData(true)
                                setIsDropdownOpen(!isDropdownOpen)
                            }}>
                                <a className="h-14">{division.divisionname}</a>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    {pieChartData &&(<PieChart key={`${pieChartData.willing}-${pieChartData.tentative}-${pieChartData.notWilling}`} data={pieChartData} />)}
                </div>
                </div>
            </div>
            <div className="card bg-base-100 w-3/5">
                <div className="card-body">
                <h2 className="card-title">Role Statistic</h2>
                <RoleStatisticTable roleStatistics={roleStatistics} />
                </div>
            </div>
            </div>
        </div>
        );
    }
}

export default ManageCareerChoice;
