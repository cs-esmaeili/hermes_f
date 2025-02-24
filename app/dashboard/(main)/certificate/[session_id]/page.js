'use client'

import { useState, useEffect, useRef } from 'react';
import Icdl from '@/components/dashboard/certificate/Icdl';
import { useParams } from 'next/navigation';
import useGetExamSession from '@/hooks/examSession/useGetExamSession';

const page = () => {

    const params = useParams();
    const { session_id } = params;
    const [examSession, setExamSession] = useState(null);

    const { getExamSessionRequest } = useGetExamSession((session) => {
        setExamSession(session);
    }, () => { });


    useEffect(() => {
        if (session_id) {
            getExamSessionRequest(session_id);
        }
    }, [session_id]);


    return (
        <div className='flex flex-col grow rtl gap-3'>
            {examSession &&
                <>
                    {(examSession.exam_id.certificate == "ICDL") && <Icdl editMode={false}  data={examSession}/>}
                </>
            }
        </div>
    );
};

export default page;