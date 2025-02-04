'use client'

import CreateCourse from "@/components/dashboard/course/CreateCourse";
import { useState, useEffect, useRef } from 'react';
import NavigationMenu from '@/components/dashboard/NavigationMenu';
import BlurLoading from '@/components/dashboard/BlurLoading';
import CourseList from "@/components/dashboard/course/CourseList";
import TopicList from "@/components/dashboard/course/TopicList";

const page = () => {

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [page, setPage] = useState("createCourse");
    const [loading, setLoading] = useState(false);
    const scrollbarRef = useRef();

    useEffect(() => {
        if (selectedCourse) {
            setPage("createCourse");
        }
    }, [selectedCourse]);

    return (
        <div className='flex flex-col flex-co p-5 w-full xl:flex-row-reverse relative grow gap-3 h-full overflow-auto' ref={scrollbarRef}>
            <BlurLoading loading={loading} />

            <div className='w-full h-fit xl:w-1/4'>
                <NavigationMenu
                    page={page}
                    setPage={(page) => { setLoading(true); setPage(page); }}
                    containerClass={"flex-col xl:pl-3"}
                    items={[
                        { page: "createCourse", icon: "dashboard", label: "ساخت دوره" },
                        { page: "courseList", icon: "dashboard", label: "لیست دوره ها" },
                    ]}
                />
            </div>

            <div className='w-full h-fit xl:w-3/4 flex-grow'>
                {(page == "createCourse") &&
                    <>
                        <CreateCourse isAdmin={true} selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} setParentLoading={setLoading} />
                        {(selectedCourse) && <TopicList selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />}
                    </>
                }

                {(page == "courseList") &&
                    <CourseList setSelectedCourse={setSelectedCourse} setParentLoading={setLoading} />
                }
            </div>
        </div>
    );
};

export default page;