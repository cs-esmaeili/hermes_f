import useFirstLogInWithGoogleStepOne from '@/hooks/auth/useFirstLogInWithGoogleStepOne';
import useFirstLogInWithGoogleStepTwo from '@/hooks/auth/useFirstLogInWithGoogleStepTwo';
import CustomInput from '@/components/dashboard/CustomInput';
import { useEffect, useState } from 'react';
import Timer from '@/components/dashboard/Timer';

const FirstLogInWithGoogle = ({ email, setError, SetPage }) => {


    const [code, setCode] = useState("");
    const [timer, setTimer] = useState(0);
    const [loading, setLoading] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState("09137378601");
    const [password, setPassword] = useState("admin");

    const reserForm = () => {
        setCode("");
        setTimer(0);
        setLoading(true);
        setPassword("");
        setPhoneNumber("");
        setError("");
        SetPage("main");
    }

    const { firstLogInWithGoogleStepOneRequest } = useFirstLogInWithGoogleStepOne(email, phoneNumber, setLoading, setTimer, setError);

    const { firstLogInWithGoogleStepTwoRequest } = useFirstLogInWithGoogleStepTwo(phoneNumber, email, code, password, setLoading, setError, reserForm);

    useEffect(() => {
    }, []);

    return (
        <>
            <span className='mb-5'>
                برای اولین بار باید  اطلاعات خود را ثبت کنید
            </span>
            <CustomInput rightLabel="شماره تلفن خود را وارد کنید" value={phoneNumber} inputClassName={"flex w-full text-center !ltr"} onChange={(e) => {
                setPhoneNumber(e.target.value);
            }} />
            <CustomInput rightLabel="رمز عبور انتخاب کنید" value={password} inputClassName={"flex w-full text-center !ltr"} onChange={(e) => {
                setPassword(e.target.value);
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
                    <CustomInput
                        rightLabel="کد ارسال شده"
                        inputClassName={"placeholder:text-center text-center w-full mb-3"}
                        onChange={(e) => {
                            setCode(e.target.value);
                        }}
                        maxLength={4}
                        value={code}
                        inputMode="numeric"
                        pattern="[0-9]*"
                    />
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
                                firstLogInWithGoogleStepTwoRequest();
                            } else {
                                firstLogInWithGoogleStepOneRequest();
                            }
                        }}>
                            {(timer > 0) ? "ثبت" : "ارسال کد"}
                        </button>
                    </div>
                </>
            }
        </>
    );
};

export default FirstLogInWithGoogle;