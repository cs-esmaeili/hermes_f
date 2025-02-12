'use client'

import { useState, useEffect, useRef } from 'react';
import NavigationMenu from '@/components/dashboard/NavigationMenu';
import BlurLoading from '@/components/dashboard/BlurLoading';
import TicketList from '@/components/dashboard/ticket/TicketList';
import TicketDetails from '@/components/dashboard/ticket/TicketDetails';
import CreateTicket from '@/components/dashboard/ticket/CreateTicket';

export default function TicketPage() {

    const [page, setPage] = useState("createTicket");
    const [loading, setLoading] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const scrollbarRef = useRef();

    useEffect(() => {
        if (selectedTicket) {
            setPage("tickDetails");
        }
    }, [selectedTicket]);

    return (
        <div
            className='flex flex-col p-5 w-full xl:flex-row-reverse relative grow gap-3 h-full overflow-auto'
            ref={scrollbarRef}>

            <BlurLoading loading={loading} />

            <div className='w-full h-fit xl:w-1/4'>
                <NavigationMenu
                    page={page}
                    setPage={(page) => {
                        setLoading(true);
                        setPage(page);
                    }}
                    containerClass={"flex-col xl:pl-3"}
                    items={[
                        { page: "createTicket", icon: "addnote", label: "ساخت تیکت" },
                        { page: "ticketList", icon: "list", label: "لیست تیکت‌ها" },
                    ]}
                />
            </div>

            <div className='w-full h-fit xl:w-3/4 flex-grow'>
                {page === "createTicket" && (
                    <CreateTicket
                        setParentLoading={setLoading}
                        scrollbarRef={scrollbarRef}
                        setSelectedTicket={setSelectedTicket}
                        selectedTicket={selectedTicket}
                        setParentPage={setPage}
                    />
                )}
                {page === "tickDetails" && (
                    <TicketDetails
                        setParentLoading={setLoading}
                        scrollbarRef={scrollbarRef}
                        setSelectedTicket={setSelectedTicket}
                        selectedTicket={selectedTicket}
                    />
                )}
                {page === "ticketList" && (
                    <TicketList
                        setParentLoading={setLoading}
                        scrollbarRef={scrollbarRef}
                        setSelectedTicket={setSelectedTicket}
                    />
                )}
            </div>
        </div>
    );
}
