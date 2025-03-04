'use client'

import React from 'react';
import CustomImage from '../dashboard/CustomImage';
import CustomInput from '../dashboard/CustomInput';
import DivButton from '../dashboard/DivButton';
import Icon from '../general/Icon';

const Header = () => {
    return (
        <div className='flex mt-5 bg-secondary rounded-2xl p-8 justify-center items-center rtl  gap-20'>
            <div className='w-1/6'>
                <CustomImage src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL} width={100} height={100} />
            </div>
            <div className=' w-3/6 flex flex-row justify-center items-center gap-2 bg-blue-400-500'>

                <div className='bg-primary flex grow justify-start items-center rounded-xl gap-1 p-2'>
                    <Icon className={"text-textcolor w-7 h-7"} name={"search"} />
                    <CustomInput className={"bg-transparent w-full"} placeholder={"چه دوره ای نیاز دارید؟"} />
                </div>
                <DivButton className='bg-orange-500 !w-fit text-textcolor !p-2' >
                    <Icon className={"text-textcolor w-7 h-7"} name={"userSpeak"} />
                    <span>تدریس کنید</span>
                </DivButton>
            </div>
            <div className='w-2/6 flex ltr'>
                <div className='relative rounded-full border-2 border-purple-300 '>
                    <CustomImage src={"/assets/images/avatar.jpg"} width={50} height={50} />
                </div>
            </div>
        </div>
    );
};

export default Header;