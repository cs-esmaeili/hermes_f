'use client';

import Icdl from '@/components/dashboard/certificate/Icdl';
import React from 'react';

const page = () => {
    return (
        <div className='flex grow'>
            <Icdl image={`${process.env.NEXT_PUBLIC_API}assets/back.jpg`} text={"این یک مدرک ازمایشی است"}/>
        </div>
    );
};

export default page;