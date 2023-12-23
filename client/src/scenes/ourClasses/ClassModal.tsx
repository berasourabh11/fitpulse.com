// ClassModal.tsx
import React, { useState } from 'react';
import Crossfit from '../../assets/Crossfit.jpg';
import ClassCalender from '../../shared/ClassCalender';
import { Activity } from '../../shared/types';

type ClassModalProps = {
  activityDetails : Activity;
  closeModal: () => void;
};

type WeekDetails = {
  startDate: number;
  startMonth: string;
  endDate: number;
  endMonth: string;
};


const ClassModal: React.FC<ClassModalProps> = ({ activityDetails, closeModal }) => {




  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

        {/* Background overlay */}
        <div className="fixed inset-0 bg-[#878787] bg-opacity-75 transition-opacity"></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:w-3/4 lg:w-3/5 xl:w-2/3" role="dialog" aria-modal="true" aria-labelledby="modal-headline">

          {/* Cover photo area */}
          <div className="relative">
            {/* Cover photo */}
            <img src={activityDetails.imageurl} alt="Cover" className="w-full h-72 object-cover" />

            {/* Overlay content */}
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white p-4">
              <h3 className="text-xl font-bold">{activityDetails.activityName}</h3>
              {/* Additional overlay content goes here */}
            </div>
          </div>





          {/* Modal body */}
          <div className="bg-white p-4 sm:p-6">
            {/* Weekly calendar */}
            <ClassCalender activityDetails={activityDetails}/>
          </div>

          {/* Modal footer */}
          <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:w-auto sm:text-sm" onClick={closeModal}>
              Close
            </button>
            {/* Other buttons or actions */}
          </div>
        </div>
      </div>
    </div>
  );
};






export default ClassModal;

