'use client'
import "@/app/globals.css"


export const EditSemesterModal = ({semesterid, closeModal}) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 ">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
          <button className="btn" onClick={closeModal}>Close</button>
        </div>
      </div>
    );
  };
  