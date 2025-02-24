'use client'

import { useState, useEffect, useRef } from 'react';
import useGetExamSessions from '@/hooks/examSession/useGetExamSessions';
import Table from '@/components/dashboard/Table';
import Pagination from '@/components/dashboard/Pagination';
import { FaEye } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { IoEnter } from "react-icons/io5";
import DivButton from '../DivButton';
import Icon from '@/components/general/Icon';

const Sessions = ({ setParentLoading }) => {

    const [sessions, setSessions] = useState(null);
    const [sessionCount, setSessionCount] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(12);
    const { push } = useRouter();

    const { getExamSessionsRequest } = useGetExamSessions(({ examSessionCount, examSessions }) => {

        setSessions(examSessions);
        setSessionCount(examSessionCount);
    }, page, perPage);

    useEffect(() => {
        setParentLoading(false);
    }, []);

    useEffect(() => {
        getExamSessionsRequest();
    }, [page]);

    return (
        <div>
            {sessions &&
                <Table
                    headers={["تاریخ امتحان", "نام کاربر", "نمره", "وضعیت", "نام آزمون"]}
                    rowsData={["createdAt", "user_id.data.fullName", "score", "status", "exam_id.title"]}
                    rows={sessions}
                    rowClasses={(row, rowIndex) => {
                        return "bg-primary";
                    }}
                    cellClasses={(cell, cellIndex, row, rowIndex) => {
                        if (cellIndex == 3)
                            return cell == "completed" ? "text-green-400" : "text-red-400";
                    }}
                    actionComponent={({ rowData, rowIndex }) => {
                        return (
                            <div className="flex h-full items-center justify-center gap-2 text-nowrap">
                                {rowData.status == "in-progress" &&
                                    <DivButton className='!w-fit bg-yellow-500 text-textcolor' onClick={() => {
                                        push(`/dashboard/exam/${rowData._id}`)
                                    }}>
                                        <IoEnter className='text-xl  cursor-pointer' />
                                        <span>ادامه امتحان</span>
                                    </DivButton>
                                }
                                {rowData.status == "completed" &&
                                    <DivButton className='!w-fit bg-yellow-500 text-textcolor' onClick={() => {
                                        push(`/dashboard/exam/result/${rowData._id}`)
                                    }} >
                                        <FaEye className='text-xl  cursor-pointer' />
                                        <span>مشاهده نتایج</span>
                                    </DivButton>
                                }
                                {rowData.status == "completed" &&
                                // {rowData.status == "completed" && rowData.score >= rowData.exam_id.minScore &&
                                    <DivButton className='!w-fit bg-blue-500 text-textcolor' onClick={() => {
                                        push(`/dashboard/certificate/${rowData._id}`)
                                    }} >
                                        <Icon name={"certificate"} className="w-6 h-6" />
                                        <span>دریافت مدرک</span>
                                    </DivButton>
                                }
                            </div>
                        );
                    }}
                    rowCountstart={(perPage * (page - 1))}
                />
            }
            <Pagination activePage={page} perPage={perPage} count={sessionCount} setActivePage={setPage} />

        </div>
    );
};

export default Sessions;