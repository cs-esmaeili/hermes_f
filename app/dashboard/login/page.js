'use client'

import CustomImage from '@/components/dashboard/CustomImage';
import CustomInput from '@/components/dashboard/CustomInput';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { isEmailOrPhone } from '@/utils/user';
import { useEffect, useState } from 'react';
import Password from './Password';
import Phone from './Phone';
import ResetPassword from './ResetPassword';
import FirstLogInWithGoogle from './FirstLogInWithGoogle';
import GoogleLogInButton from '@/components/dashboard/GoogleLogInButton';
import useGoogleLogInCheckNeedRegister from '@/hooks/auth/useGoogleLogInCheckNeedRegister';

const LogIn = () => {


    const [userName, setUserName] = useState("cs.esmaeili@gmail.com");
    const [userNameType, setUserNameType] = useState("email");
    const [error, setError] = useState("");
    const [loadingMain, setLoadingMain] = useState(false);
    const [page, SetPage] = useState("main");

    const { googleLogInCheckNeedRegisterRequest } = useGoogleLogInCheckNeedRegister(setError, SetPage, setLoadingMain);

    useEffect(() => {
        setError("");
        setLoadingMain(false);
    }, [userName]);

    const resetMainForm = () => {
        setUserName("");
        setUserNameType("");
        setError("");
        SetPage("main");
    }


    return (
        <section className='flex  flex-col h-screen w-full max-w-full overflow-hidden justify-center items-center'>
            <Toaster position="top-center" />
            <div className={`flex rtl font-bold mb-10 gap-5 flex-col md:flex-row justify-center items-center ${process.env.DIRECTION}`}>
                <CustomImage src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL} width={100} height={100} />
                <div className='text-5xl md:text-7xl'>
                    <span className='dark:text-white'>هر</span>
                    <span className='text-accent'>مس</span>
                </div>
            </div>

            {loadingMain ?
                <div className="relative  w-20 h-20">
                    <div className="w-full h-full rounded-full absolute  border-4 border-solid border-gray-200"></div>
                    <div className="w-full h-full rounded-full absolute animate-spin  border-4 border-solid border-accent border-t-transparent shadow-md"></div>
                </div>
                :
                <div className='flex flex-col justify-center bg-secondary rounded-lg p-4 text-center shadow-2xl max-w-full'>
                    <div className='flex flex-col gap-3 mb-5'>
                        <h1 className='text-2xl font-bold md:text-3xl'>
                            ورود / ثبت نام
                        </h1>
                        <h6>
                            به پنل هرمس خوش آمدید
                        </h6>
                    </div>
                    <div className='flex flex-col gap-3'>
                        {(page == "main") &&
                            <>
                                <CustomInput rightLabel="ایمیل یا شماره تلفن" value={userName} inputClassName={"flex w-full text-center !ltr"} onChange={(e) => {
                                    setUserName(e.target.value);
                                    setUserNameType(isEmailOrPhone(e.target.value));
                                }} />
                                {(userNameType == "phone") && <Phone userName={userName} setError={setError} setLoadingMain={setLoadingMain} />}
                                {(userNameType == "email") && <Password userName={userName} setError={setError} SetPage={SetPage} setLoadingMain={setLoadingMain} />}
                            </>
                        }
                        {(page == "resetPassword") &&
                            <div className='flex flex-col gap-3'><ResetPassword userName={userName} setError={setError} SetPage={SetPage} setLoadingMain={setLoadingMain} /></div>
                        }
                        {(page == "firstLogInWithGoogle") &&
                            <div className='flex flex-col gap-3'>
                                <FirstLogInWithGoogle email={userName} setError={setError} SetPage={SetPage} setLoadingMain={setLoadingMain} />
                            </div>
                        }

                        <div className={`w-full bg-red-400 rounded-md items-center justify-center p-2 hidden ${error && "!flex"}`}>
                            {error}
                        </div>

                        <div className="flex items-center space-x-2">
                            <hr className="flex-1 border-t" />
                            <span>یا</span>
                            <hr className="flex-1 border-t" />
                        </div>
                        <GoogleLogInButton onSuccess={(data, token) => {
                            setUserName(data.email);
                            googleLogInCheckNeedRegisterRequest(data.email, token);
                        }}
                        />
                        <div className='text-xs md:text-sm lg:text-md px-3 opacity-75'>
                            <span>ورود شما به معنای پذیرش </span>
                            <Link href="/terms" className='text-accent'>قوانین</Link>
                            <span> و شرایط هرمس است </span>
                        </div>
                    </div>
                </div>
            }
        </section>
    );
};

export default LogIn;