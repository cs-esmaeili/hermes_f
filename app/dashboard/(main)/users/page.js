'use client'

import { useState, useEffect, useRef } from 'react';
import NavigationMenu from '@/components/dashboard/NavigationMenu';
import BlurLoading from '@/components/dashboard/BlurLoading';
import CreateUser2 from '@/components/dashboard/users/CreateUser2';

export default function user({ selfMode = false }) {


    const [page, setPage] = useState("createUser");
    const [loading, setLoading] = useState(false);
    const scrollbarRef = useRef();



    return (
        <div className='flex flex-wrap p-5 flex-row-reverse xl:flex-nowrap relative grow gap-3 overflow-y-auto' ref={scrollbarRef}>

            <BlurLoading loading={loading} />

            <div className='w-full h-fit xl:w-1/4'>
                <NavigationMenu
                    page={page} setPage={(page) => { setLoading(true); setPage(page); }}
                    containerClass={"flex-col xl:pl-3"}
                    items={[
                        { page: "createUser", icon: "dashboard", label: "ساخت کاربر" },
                        { page: "userList", icon: "dashboard", label: "لیست کاربران" },
                    ]}
                />
            </div>
            <div className='w-full h-fit xl:w-3/4 overflow-hidden'>
                {(page == "createUser") && <CreateUser2 setParentLoading={setLoading} scrollbarRef={scrollbarRef} />}
            </div>


        </div >
    )
}
