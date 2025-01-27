'use client'

import { useState, useEffect, useRef } from 'react';
import NavigationMenu from '@/components/dashboard/NavigationMenu';
import BlurLoading from '@/components/dashboard/BlurLoading';
import UserList from '@/components/dashboard/users/UserList';
import Profile from '@/components/dashboard/Profile';

export default function user() {

    const [page, setPage] = useState("createUser");
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    const scrollbarRef = useRef();


    useEffect(() => {
        if (selectedUser) {
            setPage("createUser");
        }
    }, [selectedUser]);

    return (
        <div className='flex flex-col flex-co p-5 w-full xl:flex-row-reverse relative grow gap-3 h-full overflow-auto' ref={scrollbarRef}>
            <BlurLoading loading={loading} />

            <div className='w-full h-fit xl:w-1/4'>
                <NavigationMenu
                    page={page}
                    setPage={(page) => { setLoading(true); setPage(page); }}
                    containerClass={"flex-col xl:pl-3"}
                    items={[
                        { page: "createUser", icon: "dashboard", label: "ساخت کاربر" },
                        { page: "userList", icon: "dashboard", label: "لیست کاربران" },
                    ]}
                />
            </div>

            <div className='w-full h-fit xl:w-3/4 flex-grow'>
                {(page == "createUser") &&
                    <Profile setParentLoading={setLoading} scrollbarRef={scrollbarRef} setSelectedUser={setSelectedUser}
                        selectedUser={selectedUser} isAdmin={true} />
                }
                {(page == "userList") && <UserList setParentLoading={setLoading} scrollbarRef={scrollbarRef} setSelectedUser={setSelectedUser} />}
            </div>
        </div>
    )
}
