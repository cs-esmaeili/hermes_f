'use client'

import { useState, useEffect } from 'react';
import NavigationMenu from '@/components/dashboard/NavigationMenu';
import BlurLoading from '@/components/dashboard/BlurLoading';
import CreateUser2 from '@/components/dashboard/users/CreateUser2';

export default function user({ selfMode = false }) {

    const [page, setPage] = useState("createUser");
    const [loading, setLoading] = useState(false);


    return (
        <div className='container flex bg-red-400  relative  grow  gap-3 '>

            <BlurLoading loading={loading} />
            {(page == "createUser") && <CreateUser2 setParentLoading={setLoading} />}

            <NavigationMenu
                page={page} setPage={(page) => { setLoading(true); setPage(page); }}
                items={[
                    { page: "createUser", icon: "dashboard", label: "ساخت کاربر" },
                    { page: "userList", icon: "dashboard", label: "لیست کاربران" },
                ]}
            />


        </div >
    )
}
