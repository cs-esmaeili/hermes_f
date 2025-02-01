'use client'

import { useState, useEffect, useRef } from 'react';
import Table from '@/components/dashboard/Table';
import Pagination from '@/components/dashboard/Pagination';
import useApprovalList from "@/hooks/approval/useApprovalList";
import useAcceptApproval from "@/hooks/approval/useAcceptApproval";
import useRejectApproval from "@/hooks/approval/useRejectApproval";
import { FaEye } from "react-icons/fa";
import DivButton from '@/components/dashboard/DivButton';
import CustomInput from '@/components/dashboard/CustomInput';
import { useModalContext } from '@/components/dashboard/Modal';
import ApprovalDetails from '@/components/dashboard/ApprovalDetails';

const UserList = () => {

    const [approvals, setApprovals] = useState(null);
    const [approvalsCount, setApprovalsCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [perPage, setPerPage] = useState(8);
    const { approvalListRequest } = useApprovalList(activePage, perPage, setApprovals, setApprovalsCount);
    const { acceptApprovalRequest } = useAcceptApproval(approvalListRequest);
    const { rejectApprovalRequest } = useRejectApproval(approvalListRequest);
    const { openModal, closeModal } = useModalContext();

    const commentRef = useRef();

    useEffect(() => {
        approvalListRequest();
    }, [activePage]);

    return (
        <div className='flex flex-col grow'>
            <div className='flex grow w-full overflow-x-scroll rounded-md '>
                {approvals &&
                    <Table
                        headers={["ID", "تاریخ", "نوع درخواست", "وضعیت"]}
                        rowsData={["_id", "updatedAt", "title", "status"]}
                        rows={approvals}
                        rowClasses={(row, rowIndex) => {
                            return "!bg-primary";
                        }}
                        cellClasses={(cell, cellIndex, row, rowIndex) => {
                            if (cell == "rejected" && cellIndex == 3) {
                                return ("text-red-400");
                            } else if (cell == "pending" && cellIndex == 3) {
                                return ("text-green-400");
                            }
                        }}
                        actionComponent={({ rowData, rowIndex }) => {
                            return (
                                <div className="flex h-full items-center justify-center gap-5 text-nowrap rounded-lg">
                                    <div className='w-fit  flex !flex-col gap-2 bg-secondary'  >
                                        <CustomInput placeholder="دلیل رد" defaultValue={rowData.comment} containerClassName="border-2 rounded-lg !border-red-500" ref={commentRef} />
                                        <DivButton className='bg-red-500 flex justify-center items-center' onClick={() => rejectApprovalRequest(rowData._id, commentRef.current.value)}>
                                            <span>
                                                رد
                                            </span>
                                        </DivButton>
                                    </div>
                                    <DivButton className='!w-fit bg-green-500' onClick={() => acceptApprovalRequest(rowData._id)}>
                                        <span>
                                            ثبت
                                        </span>
                                    </DivButton>

                                    <FaEye className='text-xl ml-4 text-yellow-400' onClick={() => {
                                        openModal(<ApprovalDetails selectedRequest={rowData} />);
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