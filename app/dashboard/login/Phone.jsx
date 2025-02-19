import usePhoneLogInStepOne from '@/hooks/auth/usePhoneLogInStepOne';
import usePhoneLogInStepTwo from '@/hooks/auth/usePhoneLogInStepTwo';
import CustomInput from '@/components/dashboard/CustomInput';
import Timer from '@/components/dashboard/Timer';
import { useEffect, useState } from 'react';

const Phone = ({ userName, setError, setLoadingMain }) => {

    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState("");
    const [step, setStep] = useState(true);
    const [timer, setTimer] = useState(0);

    const { phoneStepOneLogInRequest } = usePhoneLogInStepOne(userName, setLoading, setStep, setTimer, setError);
    const { phoneStepTwoLogInRequest } = usePhoneLogInStepTwo(userName, code, setLoading, setStep, setTimer, setError, setLoadingMain);


    useEffect(() => {
        setCode("");
        setLoading(false);
        setStep(true);
    }, [userName]);

    useEffect(() => {
        setError("");
    }, [code]);

    useEffect(() => {
        if (step) {
            setTimer(0);
        }
    }, [step]);



    return (
        <>
            {(!step) &&
                <CustomInput
                    rightLabel={"کد ارسال شده را وارد کنید"}
                    inputClassName={"placeholder:text-center text-center w-full"}
                    onChange={(e) => {
                        setCode(e.target.value);

                    }}
                    maxLength={4}
                    value={code}
                    inputMode="numeric"
                    pattern="[0-9]*"
                />
            }

            <div className='flex grow justify-center items-center'>
                {timer != 0 && !step &&
                    <div className='w-full flex items-center justify-center'>
                        <Timer initialTime={timer} onTimerEnd={() => {
                            setStep(true);
                            setCode("");
                            setTimer(0);
                            setLoading(false);
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
                            setError("");
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