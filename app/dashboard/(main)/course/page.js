'use client'

import { useState, useEffect, useRef } from "react";
import CustomInput from '@/components/dashboard/CustomInput';
import { BsImage } from "react-icons/bs";
import PickFile from "@/components/dashboard/PickFile";
import CustomImage from "@/components/dashboard/CustomImage";
import { ImCross } from "react-icons/im";
import DivButton from "@/components/dashboard/DivButton";
import useCreateCourse from "@/hooks/course/useCreateCourse";
import useGetCourse from "@/hooks/course/useGetCourse";
import ProgressBar from "@/components/dashboard/ProgressBar";
import CourseList from "@/components/dashboard/course/CourseList";


const page = ({ setSelectedCourse, selectedCourse, isAdmin = false, setParentLoading }) => {
    const pickFileRef = useRef(null);


    const handleInputChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleFileChange = (file) => {
        setFormData({ ...formData, file });
    };

    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (e) {
            return false;
        }
    }
    const [progress, setProgress] = useState(0);
    const [selectedCourseId, setSelectedCourseId] = useState(0);

    const [formData, setFormData] = useState({
        courseName: selectedCourse?.courseName || "haha",
        description: selectedCourse?.description || "توضیحات هاها",
        level: selectedCourse?.level || "متوسط",
        file: selectedCourse?.data?.image?.url || null,
    });



    const { createCourseRequest } = useCreateCourse(
        (course_id) => {
            setSelectedCourseId(course_id);
        },
        (present) => {
            setProgress(present);
        }
    );



    return (
        <div className='flex flex-col grow  bg-primary rounded-xl p-5 overflow-y-auto gap-3'>
            {selectedCourse && isAdmin && (
                <div className="flex justify-between bg-orange-400 p-3 rounded-md">
                    <div className="flex grow items-center">{`User : ${selectedCourse._id}`}</div>
                    <DivButton className="flex items-center !w-fit" onClick={() => setSelectedCourse(null)}>
                        <ImCross className="text-textcolor" />
                    </DivButton>
                </div>
            )}
            <div className='flex flex-col w-full  gap-3  h-fit'>
                <div className={`flex items-center justify-center bg-secondary w-full py-10 md:p-5 xl:p-10 rounded-md`}>
                    <PickFile ref={pickFileRef} fileSelectListener={handleFileChange} />
                    {formData.file ? (
                        <div className="relative w-full h-[500px]">
                            <CustomImage src={isValidUrl(formData.file) ? formData.file : URL.createObjectURL(formData.file)} fill onClick={() => pickFileRef.current.openFilePicker()} />
                        </div>
                    ) : (
                        <BsImage className='text-5xl rounded m-24' onClick={() => pickFileRef.current.openFilePicker()} />
                    )}
                </div>

                <div className="flex w-full gap-3">
                    <CustomInput rightLabel={"نام دوره"} inputClassName={"bg-secondary"} containerClassName={" w-full"} value={formData.courseName} onChange={handleInputChange('courseName')} />
                    <CustomInput rightLabel={"توضیحات دوره"} inputClassName={"bg-secondary"} containerClassName={" w-full"} value={formData.description} onChange={handleInputChange('description')} />
                </div>
                <CustomInput rightLabel={"سطح دوره"} inputClassName={"bg-secondary"} value={formData.level} onChange={handleInputChange('level')} />
                <DivButton className={`flex w-full items-center justify-center  bg-purple-500 mt-3 ${progress > 0 && "bg-opacity-50 cursor-not-allowed"}`} onClick={() => {
                    if (progress == 0) createCourseRequest(formData);
                }}>
                    <div className="flex flex-col grow justify-center items-center gap-3">
                        <span>ثبت اطلاعات عمومی دوره</span>
                        <ProgressBar progress={progress} setProgress={setProgress} />
                    </div>
                </DivButton>
            </div>
            <CourseList course_id={selectedCourseId} />
        </div>
    );
};

export default page;