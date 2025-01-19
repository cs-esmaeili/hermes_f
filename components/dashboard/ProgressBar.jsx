import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="shadow w-full bg-primary rounded-xl">
      <div
        className="bg-accent text-xs leading-none py-1 text-center text-textcolor rounded-xl"
        style={{ width: `${progress}%` }}
      >
        {`${progress}%`}
      </div>
    </div>
  );
};

export default ProgressBar;