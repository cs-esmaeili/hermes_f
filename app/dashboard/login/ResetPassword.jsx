import useResetPasswordStepOne from '@/hooks/auth/useResetPasswordStepOne';
import useResetPasswordStepTwo from '@/hooks/auth/useResetPasswordStepTwo';
import CustomInput from '@/components/dashboard/CustomInput';
import { useEffect, useState } from 'react';
import Timer from '@/components/dashboard/Timer';

const ResetPassword = ({ userName, setError, SetPage }) => {


    const [code, setCode] = useState("");
    const [timer, setTimer] = useState(0);
    const [loading, setLoading] = useState(true);

    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");


    const reserForm = () => {
        setCode("");
        setTimer(0);
        setLoading(true);
        setPasswordOne("");
        setPasswordTwo("");
        setError("");
        SetPage("main");
    }

    const { resetPasswordStepOneRequest } = useResetPasswordStepOne(userName, setLoading, setTimer, setError);
    const { resetPasswordStepTwoRequest } = useResetPasswordStepTwo(userName, code, passwordTwo, setLoading, setError, reserForm);

    useEffect(() => {
        if (passwordOne != passwordTwo && passwordTwo.length > 0) {
            setError("رمز عبور با تکرار رمز عبور یکسان نمی باشد");
        } else {
            setError("");
        }
    }, [passwordTwo]);

    useEffect(() => {
        resetPasswordStepOneRequest();
    }, []);


    return (
        <>
            <CustomInput rightLabel="رمز عبور جدید" value={passwordOne} inputClassName={"flex w-full text-center !ltr"} onChange={(e) => {
                setPasswordOne(e.target.value);
            }} />
            <CustomInput rightLabel="تکرار رمز عبور جدید" value={passwordTwo} inputClassName={"flex w-full text-center !ltr"} onChange={(e) => {
                setPasswordTwo(e.target.value);
            }} />

            {(loading) ?
                <div className='flex w-full justify-center items-center'>
                    <div className="relative  w-10 h-10">
                        <div className="w-full h-full rounded-full absolute  border-4 border-solid border-gray-200"></div>
                        <div className="w-full h-full rounded-full absolute animate-spin  border-4 border-solid border-accent border-t-transparent shadow-md"></div>
                    </div>
                </div>
                :
                <>
                    {timer != 0 &&
                        <CustomInput
                            rightLabel="کد ارسال شده"
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
                        {timer != 0 &&
                            <div className='w-full flex items-center justify-center'>
                                <Timer min={timer} TimerEndListener={() => {
                                    setCode("");
                                    setTimer(0);
                                    setLoading(false);
                                }} />
                            </div>
                        }

                        <button className={`bg-green-400 p-2 w-full rounded text-primary ${timer <= 0 && "!bg-yellow-400"}`} onClick={(e) => {
                            setError("");
                            if (timer > 0) {
                                resetPasswordStepTwoRequest();

                            } else {
                                resetPasswordStepOneRequest();
                            }
                        }}>
                            {(timer > 0) ? "ثبت" : "ارسال مجدد کد"}
                        </button>
                    </div>
                </>
            }
        </>
    );
};

export default ResetPassword;