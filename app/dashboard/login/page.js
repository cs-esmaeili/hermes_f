'use client'

import CustomImage from '@/components/dashboard/CustomImage';
import CustomInput from '@/components/dashboard/CustomInput';
import config from "@/config.json";
import { Toaster } from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import Captcha from '@/components/general/captcha';
import translation from '@/translation/translation';
import { isEmailOrPhone } from '@/utils/user';
import { useState } from 'react';
import useCreateOrLoginWithPassword from '@/hooks/auth/useCreateOrLoginWithPassword';

const LogIn = () => {

    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("cs.esmaeili@gmail.com");
    const [password, setPassword] = useState("admin");
    const [userNameType, setUserNameType] = useState("email");

    const { passwordLogInRequest } = useCreateOrLoginWithPassword();

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
                    <CustomInput label="ایمیل یا شماره تلفن" value={userName} inputClassName={"flex w-full text-center !ltr"} onChange={(e) => {
                        setUserNameType(isEmailOrPhone(e.target.value));
                    }} />
                    <div className='flex gap-3 flex-col sm:flex-row w-full h-fit'>
                        <div className='min-h-12 max-h-12 min-w-32 md:max-w-10'>
                            <Captcha setCaptchaCode={(code) => console.log(code)} />
                        </div>
                        <CustomInput placeholder='کد امنیتی' inputClassName={"placeholder:text-center w-full"} />
                    </div>

                    {(userNameType == "phone") &&
                        <CustomInput placeholder='کد امنیتی' inputClassName={"placeholder:text-center w-full"} onChange={(e) => {
                            setUserNameType(isEmailOrPhone(e));
                        }} />
                    }
                    {(userNameType == "email") &&
                        <CustomInput placeholder='رمز عبور را وارد کنید' inputClassName={"placeholder:text-center text-center w-full"}
                            value={password} onChange={(e) => {

                            }} />
                    }
                    <div className='flex grow justify-center items-center'>
                        {(loading) ?
                            <div className="relative  w-10 h-10">
                                <div className="w-full h-full rounded-full absolute  border-4 border-solid border-gray-200"></div>
                                <div className="w-full h-full rounded-full absolute animate-spin  border-4 border-solid border-accent border-t-transparent shadow-md"></div>
                            </div>
                            :
                            <>
                                <button className='bg-accent p-2 w-full rounded !text-white' onClick={() => {
                                    passwordLogInRequest(userName, password, setLoading);
                                }}>ورود</button>
                            </>
                        }
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