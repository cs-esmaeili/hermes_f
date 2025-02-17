'use client'

import { useState, useEffect, useRef } from 'react';
import NavigationMenu from '@/components/dashboard/NavigationMenu';
import BlurLoading from '@/components/dashboard/BlurLoading';
import CreateExam from '@/components/dashboard/exam/CreateExam';


const page = () => {

    const [page, setPage] = useState("CreateExam");
    const [loading, setLoading] = useState(false);


    useEffect(() => {

    }, []);

    return (
        <div className='flex flex-col flex-co p-5 w-full xl:flex-row-reverse relative grow gap-3 h-full overflow-auto'>
            <BlurLoading loading={loading} />

            <div className='w-full h-fit xl:w-1/4'>
                <NavigationMenu
                    page={page}
                    setPage={(page) => { setLoading(true); setPage(page); }}
                    containerClass={"flex-col xl:pl-3"}
                    items={[
                        { page: "CreateExam", icon: "dashboard", label: "طرح امتحان" },
                    ]}
                />
            </div>
            <div className='w-full h-fit xl:w-3/4 flex-grow'>
                {(page == "CreateExam") &&
                    <CreateExam />
                }

            </div>
        </div>
    );
};

export default page;