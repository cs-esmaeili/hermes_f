'use client'

import CustomImage from '@/components/dashboard/CustomImage';
import CustomInput from '@/components/dashboard/CustomInput';
import config from "@/config.json";
import { Toaster } from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { isEmailOrPhone } from '@/utils/user';
import { useEffect, useState } from 'react';
import Password from './Password';
import Phone from './Phone';
import ResetPassword from './ResetPassword';

const LogIn = () => {


    const [userName, setUserName] = useState("cs.esmaeili@gmail.com");
    const [userNameType, setUserNameType] = useState("email");
    const [error, setError] = useState("");
    const [page, SetPage] = useState("resetPassword");

    useEffect(() => {
        setError("");
    }, [userName]);


    return (
        <section className='flex  flex-col h-screen w-full max-w-full overflow-hidden justify-center items-center'>
            <Toaster position="top-center" />
            <div className={`flex rtl font-bold mb-10 gap-5 flex-col md:flex-row justify-center items-center ${config.direction}`}>
                <CustomImage src={config.api + config.logo_url} width={100} height={100} />
                <div className='text-5xl md:text-7xl'>
                    <span className='dark:text-white'>هر</span>
                    <span className='text-accent'>مس</span>
                </div>
            </div>


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
                            {(userNameType == "phone") && <Phone userName={userName} setError={setError} />}
                            {(userNameType == "email") && <Password userName={userName} setError={setError} SetPage={SetPage} />}
                        </>
                    }
                    {(page == "resetPassword") &&
                        <div className='flex flex-col gap-3'><ResetPassword userName={userName} setError={setError} SetPage={SetPage}  /></div>
                    }

                    <div className={`w-full bg-red-400 rounded-md items-center justify-center p-2 hidden ${error && "!flex"}`}>
                        {error}
                    </div>

                    <div className="flex items-center space-x-2">
                        <hr className="flex-1 border-t" />
                        <span>یا</span>
                        <hr className="flex-1 border-t" />
                    </div>

                    <button className='bg-primary p-2 w-full rounded flex justify-center items-center gap-3'>
                        <span>
                            ورود با گوگل
                        </span>
                        <FcGoogle className='text-3xl' />
                    </button>
                    <div className='text-xs md:text-sm lg:text-xl'>
                        <span>ورود شما به معنای پذیرش </span>
                        <Link href="/terms" className='text-accent'>قوانین</Link>
                        <span> و شرایط هرمس است </span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default LogIn;