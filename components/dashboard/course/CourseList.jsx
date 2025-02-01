import Icon from '@/components/general/Icon';
import { useState, useEffect, useRef } from "react";
import useGetCourse from "@/hooks/course/useGetCourse";
import Loading from '@/components/dashboard/Loading';
import FileManager from '@/app/dashboard/(main)/filemanager/page';

const CourseList = ({ course_id }) => {


    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(course_id ? true : false);

    const { getCourseRequest } = useGetCourse((course) => {
        setLoading(false);
        setCourse(course);
        console.log(course);

    });


    useEffect(() => {
        if (course_id) {
            setLoading(true);
            getCourseRequest(course_id);
        }
    }, [course_id]);

    return (
        <div className={`flex flex-col gap-3 ${process.env.NEXT_PUBLIC_DIRECTION}`}>
            <Loading loading={loading} />
            {!loading && course?.courseMaterials && course?.courseMaterials.map((value, index) =>
                <div className='flex  grow h-fit justify-between   rounded-md p-3  border-2 border-dashed border-blue-400 cursor-pointer select-none'>
                    <div className='relative flex items-center justify-center gap-2 pr-3'>
                        <span className="absolute right-[-27px] w-[29px] h-[29px] bg-primary border-2 border-gray-400 border-opacity-50 text-[16px] font-bold flex items-center  justify-center rounded-full leading-none ">
                            5
                        </span>
                        <div>معرفی ابزار های keyword research</div>
                        <div className="w-px h-full bg-gray-400"></div>
                        <Icon name={"lock"} className="w-8 h-8 text-blue-400" />
                        <Icon name={"public"} className="w-8 h-8 text-yellow-400" />
                        <Icon name={"trash"} className="w-8 h-8 text-red-400" />
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <div>04:40</div>
                        <div className="w-px h-full bg-gray-400"></div>
                        <Icon name={"download"} className="w-8 h-8 text-green-400" />
                    </div>
                </div>
            )}

            {/* {!loading && course && course.courseMaterials.length <= 0 &&
                <div className='flex grow items-center justify-center p-3 my-5 rounded-md'>
                    <span>شما هیچ فایلی ندارید</span>
                </div>
            } */}

            <div className='flex  grow h-fit justify-between   rounded-md p-3  border-2 border-dashed border-blue-400 cursor-pointer select-none'>
                <div className='relative flex items-center justify-center gap-2 pr-3'>
                    <span className="absolute right-[-27px] w-[29px] h-[29px] bg-primary border-2 border-gray-400 border-opacity-50 text-[16px] font-bold flex items-center  justify-center rounded-full leading-none ">
                        5
                    </span>
                    <div>معرفی ابزار های keyword research</div>
                    <div className="w-px h-full bg-gray-400"></div>
                    <Icon name={"lock"} className="w-8 h-8 text-blue-400" />
                    <Icon name={"public"} className="w-8 h-8 text-yellow-400" />
                    <Icon name={"trash"} className="w-8 h-8 text-red-400" />
                </div>
                <div className='flex items-center justify-center gap-2'>
                    <div>04:40</div>
                    <div className="w-px h-full bg-gray-400"></div>
                    <Icon name={"download"} className="w-8 h-8 text-green-400" />
                </div>
            </div>


            <div className='flex grow items-center justify-center border-2 border-solid border-gray-400 p-3 rounded-md'>
                <Icon name={"add"} />
                <span>افزودن فایل</span>
            </div>

        </div>
    );
};

export default CourseList;