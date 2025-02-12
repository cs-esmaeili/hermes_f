'use client'

import { useState, useEffect } from 'react';
import Table from '@/components/dashboard/Table';
import Pagination from '@/components/dashboard/Pagination';
import useTicketList from '@/hooks/ticket/useTicketList';
import { FaEye } from 'react-icons/fa';

const TicketList = ({ setParentLoading, setSelectedTicket }) => {
    const [tickets, setTickets] = useState(null);
    const [ticketsCount, setTicketsCount] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [perPage] = useState(8);

    const { getTicketsRequest } = useTicketList((data) => {
        const { ticketsCount, tickets } = data;
        setTickets(tickets);
        setTicketsCount(ticketsCount);
    });

    useEffect(() => {
        getTicketsRequest({ page: activePage, perPage });
    }, [activePage]);

    useEffect(() => {
        setParentLoading(false);
    }, []);

    return (
        <div className='flex flex-col grow'>
            <div className='flex grow w-full overflow-x-scroll rounded-md'>
                {tickets && (
                    <Table
                        headers={["Ticket ID", "تاریخ", "اولویت", "نام کاربر", "شماره همراه", "ایمیل", "وضعیت", "عنوان"]}
                        rowsData={["_id", "createdAt", "priority", "from.data.fullName", "from.userName", "from.email","status", "subject"]}
                        rows={tickets}
                        rowClasses={(row, rowIndex) => {
                            return "!bg-primary";
                        }}
                        cellClasses={(cell, cellIndex, row, rowIndex) => {
                            if (cell === "closed" && cellIndex === 4) {
                                return "text-red-400";
                            } else if (cell === "open" && cellIndex === 4) {
                                return "text-green-400";
                            }
                        }}
                        actionComponent={({ rowData }) => {
                            return (
                                <div className="flex h-full items-center justify-center gap-5 text-nowrap rounded-lg" onClick={() => {
                                    setSelectedTicket(rowData);
                                    console.log("click");

                                }}>
                                    <FaEye
                                        className='text-xl ml-4 text-yellow-400 cursor-pointer'

                                    />
                                </div>
                            );
                        }}
                        rowCountstart={perPage * (activePage - 1)}
                    />
                )}
            </div>
            <Pagination
                activePage={activePage}
                perPage={perPage}
                count={ticketsCount}
                setActivePage={setActivePage}
            />
        </div>
    );
};

export default TicketList;
