import { useState } from 'react';

const ConfirmationModal = ({ title, message, onConfirm, onCancel }) => {
  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <p>{message}</p>
            <div className="flex justify-end mt-8">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded mr-4"
                onClick={onConfirm}
              >
                Confirm
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
  );
};

export default ConfirmationModal;
