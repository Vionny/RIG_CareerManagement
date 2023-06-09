"use client"
{/* You can open the modal using ID.showModal() method */}
import "@/app/globals.css"
import React from 'react';

const EditCareerModal = ({ staff }) => {

    return(
        <div className="w-16 h-10">
            <button  onClick={()=>window.my_modal_3.showModal()}>Edit</button>
            {/* <button>Edit</button> */}
            <dialog id="my_modal_3" className="z-50">
                {/* <form method="dialog" className="modal-box">
                    <button htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <div>
                        <h3 className="font-bold text-lg">Hello! {staff}</h3>
                    </div>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                </form> */}
                <h1 className="">testtttt</h1>
            </dialog>
        </div>
    )
}

export default EditCareerModal