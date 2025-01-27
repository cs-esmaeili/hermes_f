'use client'

import { useState, useEffect } from 'react';
import Table from '@/components/dashboard/Table';
import Pagination from '@/components/dashboard/Pagination';
import useApprovalList from "@/hooks/approval/useApprovalList";
import useProcessApproval from "@/hooks/approval/useProcessApproval";
import { FaEye } from "react-icons/fa";
import DivButton from '@/components/dashboard/DivButton';
import CustomInput from '@/components/dashboard/CustomInput';


const UserList = () => {

    const [selectedRequest, setSelectedRequest] = useState(null);
    const [approvals, setApprovals] = useState(null);
    const [approvalsCount, setApprovalsCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [perPage, setPerPage] = useState(8);
    const { approvalListRequest } = useApprovalList(activePage, perPage, setApprovals, setApprovalsCount);
    const { processApprovalRequest } = useProcessApproval(approvalListRequest);


    useEffect(() => {
        approvalListRequest();
    }, [activePage]);

    return (
        <div className='flex flex-col grow'>
            <div className='flex grow w-full overflow-x-scroll rounded-md'>
                {approvals &&
                    <Table
                        headers={["ID", "تاریخ", "نوع درخواست"]}
                        rowsData={["_id", "updatedAt", "urlMeta.name"]}
                        rows={approvals}
                        rowClasses={(row, rowIndex) => {
                            return "bg-primary";
                        }}
                        cellClasses={(cell, cellIndex, row, rowIndex) => {
                            return cell == "ارسال شده" && "text-green-400";
                        }}
                        actionComponent={({ rowData, rowIndex }) => {
                            return (
                                <div className="flex h-full items-center justify-center gap-5 text-nowrap rounded-lg">
                                    <div className='w-fit  flex !flex-col gap-2 bg-secondary'>
                                        <CustomInput placeholder="دلیل رد" containerClassName="border-2 rounded-lg !border-red-500" />
                                        <DivButton className='bg-red-500 flex justify-center items-center'>
                                            <span>
                                                رد
                                            </span>
                                        </DivButton>
                                    </div>
                                    <DivButton className='!w-fit bg-green-500' onClick={() => processApprovalRequest(rowData._id)}>
                                        <span>
                                            ثبت
                                        </span>
                                    </DivButton>

                                    <FaEye className='text-xl ml-4 text-yellow-400' onClick={() => {
                                        setSelectedRequest(rowData);
                                    }} />
                                </div>
                            );
                        }}
                        rowCountstart={(perPage * (activePage - 1))}
                    />
                }
            </div>
            <Pagination activePage={activePage} perPage={perPage} count={approvalsCount} setActivePage={setActivePage} />
        </div>
    );
};

export default UserList;