'use client'

import { useState, useEffect, useRef } from 'react';
import NavigationMenu from '@/components/dashboard/NavigationMenu';
import BlurLoading from '@/components/dashboard/BlurLoading';
import Exam from '@/components/dashboard/exam/Exam';
import Question from '@/components/dashboard/exam/Question';
import Sessions from '@/components/dashboard/exam/Sessions';


const page = () => {

    const [page, setPage] = useState("exam");
    const [loading, setLoading] = useState(false);


    return (
        <div className='flex flex-col flex-co p-5 w-full xl:flex-row-reverse relative grow gap-3 h-full overflow-auto'>
            <BlurLoading loading={loading} />

            <div className='w-full h-fit xl:w-1/4'>
                <NavigationMenu
                    page={page}
                    setPage={(page) => { setLoading(true); setPage(page); }}
                    containerClass={"flex-col xl:pl-3"}
                    items={[
                        { page: "exam", icon: "dashboard", label: "آزمون" },
                        { page: "question", icon: "dashboard", label: "بانک سوال" },
                        { page: "Sessions", icon: "list", label: "لیست امتحانات" },
                    ]}
                />
            </div>
            <div className='w-full h-fit xl:w-3/4 flex-grow'>
                {(page == "exam") &&
                    <Exam setParentLoading={setLoading} />
                }
                {(page == "question") &&
                    <Question setParentLoading={setLoading} />
                }
                {(page == "Sessions") &&
                    <Sessions setParentLoading={setLoading} />
                }

            </div>
        </div>
    );
};

export default page;