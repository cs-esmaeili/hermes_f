'use client'

import { useState, useEffect } from 'react';
import CustomInput from '@/components/dashboard/CustomInput';
import DivButton from '@/components/dashboard/DivButton';
import useStartExamSession from '@/hooks/examSession/useStartExamSession';

const page = () => {

    const [exam_id, setExam_id] = useState("");
    const [sessionId, setSessionId] = useState("");
    const { startExamSessionRequest } = useStartExamSession((examSession) => {
        setSessionId(examSession._id);
    });

    return (
        <div className="w-full items-center  flex flex-col gap-5">
            <div className='w-1/2'>
                <CustomInput rightLabel={"ای دی امتحان"} value={exam_id} onChange={(e) => setExam_id(e.target.value)} />
                <DivButton className={"bg-green-500 w-full justify-center"} onClick={() => {
                    startExamSessionRequest(exam_id);
                }}>ساخت</DivButton>
            </div>
            <div>
                <div>{"http://localhost:3001/dashboard/ExamAndCert/exam/" + sessionId}</div>
            </div>
        </div>
    );
};

export default page;