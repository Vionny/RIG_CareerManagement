'use client'
import "@/app/globals.css"
import { useState } from 'react';

const EditCareerModal = ({ initial,currentChoice,setCurrentChoice,onConfirm}) => {

    console.log(currentChoice)

    return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/4">
                <h2 className="text-xl font-semibold mb-4">Edit Career Choice</h2>
                
                <p>Career Choice</p>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text text-2xl mt-2">Initial</span> 
                        <input type="text" disabled={true} value = {initial.trim()} className="input input-bordered w-28 text-xl text-center max-w-xs" />
                    </label>
                </div>
                <div className="form-control mt-5">
                    <label className="label cursor-pointer">
                        <span className="label-text text-xl mt-2">Career Choice</span> 
                        <select className="select w-56 max-w-xs bg-base-200"
                            value={currentChoice}
                            onChange={(e) => {
                                setCurrentChoice(e.target.value);
                            }}>
                            <option value="willing">Willing to Continue</option>
                            <option value="not willing">Not Willing to Continue</option>
                            <option value="tentative">Tentative</option>
                        </select>
                    </label>
                </div>
                <div className="flex justify-end mt-8">
                <button
                    className="px-6 py-2 bg-blue-500 text-white rounded "
                    onClick={onConfirm}
                >
                    Edit
                </button>
                </div>
            </div>
            </div>
    );
};

export default EditCareerModal;