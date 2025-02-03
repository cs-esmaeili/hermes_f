import { useState, useEffect, useRef } from "react";
import useCourseList from "@/hooks/course/useCourseList";
import Table from '@/components/dashboard/Table';
import Pagination from '@/components/dashboard/Pagination';
import { BiSolidEdit } from 'react-icons/bi';

const CourseList = ({ setSelectedCourse, setParentLoading }) => {


    const [courses, setCourses] = useState(null);
    const [courseCount, setCourseCount] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(12);

    const { courseListRequest } = useCourseList((courses, courseCount) => {
        setCourses(courses);
        setCourseCount(courseCount);
    });


    useEffect(() => {
        setParentLoading(false);
        courseListRequest(page, perPage);
    }, []);

    return (
        <div className='flex flex-col grow'>
            <div className='flex grow w-full overflow-x-scroll '>
                {courses &&
                    <Table
                        headers={["نام دوره", "وضعیت", "زمان ساخت"]}
                        rowsData={["courseName", "status", "createdAt"]}
                        rows={courses}
                        rowClasses={(row, rowIndex) => {
                            return "bg-primary";
                        }}
                        cellClasses={(cell, cellIndex, row, rowIndex) => {
                            return cell == "ارسال شده" && "text-green-400";
                        }}
                        actionComponent={({ rowData, rowIndex }) => {
                            return (
                                <div className="flex h-full items-center justify-center gap-2 text-nowrap">
                                    <BiSolidEdit className='text-xl ml-4 text-blue-400' onClick={() => {
                                        setSelectedCourse(rowData);
                                    }} />
                                </div>
                            );
                        }}
                        rowCountstart={(perPage * (page - 1))}
                    />
                }
            </div>
            <Pagination activePage={page} perPage={perPage} count={courseCount} setActivePage={setPage} />
        </div>
    );
};

export default CourseList;