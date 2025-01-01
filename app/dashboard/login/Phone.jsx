import usePhoneLogInStepOne from '@/hooks/auth/usePhoneLogInStepOne';
import usePhoneLogInStepTwo from '@/hooks/auth/usePhoneLogInStepTwo';
import CustomInput from '@/components/dashboard/CustomInput';
import Timer from '@/components/dashboard/Timer';
import { useEffect, useState } from 'react';

const Phone = ({ userName, setError }) => {

    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState("");
    const [step, setStep] = useState(true);
    const [timer, setTimer] = useState(0);
    const { phoneStepOneLogInRequest } = usePhoneLogInStepOne(userName, setLoading, setStep, setTimer, setError);

    const { phoneStepTwoLogInRequest } = usePhoneLogInStepTwo(userName, code, setLoading, setStep, setTimer, setError);


    useEffect(() => {
        setCode("");
        setLoading(false);
        setStep(true);
    }, [userName]);

    useEffect(() => {
        setError("");
    }, [code]);


    return (
        <>
            {(!step) &&
                <CustomInput label={"کد ارسال شده را وارد کنید"} inputClassName={"placeholder:text-center text-center w-full"} onChange={(e) => {
                    setCode(e.target.value);

                }} />
            }

            <div className='flex grow justify-center items-center'>
                {timer != 0 &&
                    <div className='w-full flex items-center justify-center'>
                        <Timer min={timer} TimerEndListener={() => {
                            goToPrevious();
                            setCode("");
                            setTimer(0);
                        }} />
                    </div>
                }

                {(loading) ?
                    <div className="relative  w-10 h-10">
                        <div className="w-full h-full rounded-full absolute  border-4 border-solid border-gray-200"></div>
                        <div className="w-full h-full rounded-full absolute animate-spin  border-4 border-solid border-accent border-t-transparent shadow-md"></div>
                    </div>
                    :
                    <>
                        <button className={`bg-accent p-2 w-full rounded !text-white ${step && "bg-yellow-500"}`} onClick={(e) => {
                            if (step) {
                                phoneStepOneLogInRequest();
                            } else {
                                phoneStepTwoLogInRequest();
                            }
                        }}>
                            {(step) && "دریافت کد ورود"}
                            {(!step) && "ورود"}
                        </button>
                    </>
                }
            </div>
        </>
    );
};

export default Phone;