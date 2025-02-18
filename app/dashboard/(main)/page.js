'use client'

import { useState, useEffect } from 'react';
import CustomInput from '@/components/dashboard/CustomInput';
import DivButton from '@/components/dashboard/DivButton';
import useStartExamSession from '@/hooks/examSession/useStartExamSession';

const page = () => {

    const [exam_id, setExam_id] = useState("");

    const { startExamSessionRequest } = useStartExamSession(() => {

    });

    return (
        <div className="w-full justify-center  flex">
            <div className='w-1/2'>
                <CustomInput rightLabel={"ای دی امتحان"} value={exam_id} onChange={(e) => setExam_id(e.target.value)} />
                <DivButton className={"bg-green-500 w-full justify-center"} onClick={() => {
                    startExamSessionRequest(exam_id);
                }}>ساخت</DivButton>
            </div>
        </div>
    );
};

export default page;