import { useState } from 'react';

const SimpleInformationModal = ({  title, message, onConfirm}) => {
  const [showModal, setShowModal] = useState(false);


  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <p><div dangerouslySetInnerHTML={{ __html: message }}></div></p>
            <div className="flex justify-end mt-8">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded "
                onClick={onConfirm}
              >
                OK
              </button>
            </div>
          </div>
        </div>
  );
};

export default SimpleInformationModal;
