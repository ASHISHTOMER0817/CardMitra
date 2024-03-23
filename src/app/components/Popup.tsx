import React from 'react';

const Popup = ({Visible, popupContent}:{Visible:boolean, popupContent:string}) => {
  return (
    <div className="flex justify-end items-center h-screen">
      <div
        className={`fixed right-0 top-0 h-full w-1/3 bg-gray-200 z-50 transition-transform transform ${
          Visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <p>{popupContent}</p>
      </div>
    </div>
  );
};

export default Popup;
