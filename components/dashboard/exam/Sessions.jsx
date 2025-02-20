'use client'

import { useState, useEffect, useRef } from 'react';
import useGetExamSessions from '@/hooks/examSession/useGetExamSessions';
import Table from '@/components/dashboard/Table';
import Pagination from '@/components/dashboard/Pagination';
import { FaEye } from "react-icons/fa";

const Sessions = ({ setParentLoading }) => {

    const [sessions, setSessions] = useState(null);
    const [sessionCount, setSessionCount] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(12);

    const { getExamSessionsRequest } = useGetExamSessions(({ examSessionCount, examSession }) => {
        setSessions(examSession);
        setSessionCount(sessionCount);
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
                                {rowData.status == "completed" &&
                                    <FaEye className='text-xl ml-4 text-yellow-400 cursor-pointer' onClick={() => {
                                        setFormData(convertSelectedQutionToFormData(rowData));
                                    }} />
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