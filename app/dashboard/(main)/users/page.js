'use client'

import { useState, useEffect } from 'react';
import NavigationMenu from '@/components/dashboard/NavigationMenu';
import BlurLoading from '@/components/dashboard/BlurLoading';
import CreateUser2 from '@/components/dashboard/users/CreateUser2';

export default function user({ selfMode = false }) {

    const [page, setPage] = useState("createUser");
    const [loading, setLoading] = useState(false);


    return (
        <div className='flex relative flex-col grow max-w-full min-w-0 p-3 gap-3 '>

            <BlurLoading loading={loading} />

            <NavigationMenu
                page={page} setPage={(page) => { setLoading(true); setPage(page); }}
                items={[
                    { page: "createUser", icon: "dashboard", label: "ساخت کاربر" },
                    { page: "userList", icon: "dashboard", label: "لیست کاربران" },
                ]}
            />

            {(page == "createUser") && <CreateUser2 setParentLoading={setLoading} />}
        </div >
    )
}
