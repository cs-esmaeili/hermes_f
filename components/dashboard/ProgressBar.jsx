import { useEffect } from 'react';

const ProgressBar = ({ progress, setProgress = null }) => {

  useEffect(() => {
    if (progress == 100) {
      setProgress(0);
    }
  }, [progress]);


  if (progress != 0 && progress != 100) {
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
  } else {
    return <></>
  }
};

export default ProgressBar;