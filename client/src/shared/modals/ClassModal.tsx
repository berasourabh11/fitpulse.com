import exp from 'constants';
import React from 'react';

type ClassModalProps = {
  classInfo: string | null;
  onClose: () => void;
};

type Props = ClassModalProps;

const ClassModal= ({ classInfo, onClose }:Props) => {
  if (!classInfo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className='text-2xl font-bold mb-4'>This is the ClassModal</h2>
        <button 
          onClick={onClose} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ClassModal;