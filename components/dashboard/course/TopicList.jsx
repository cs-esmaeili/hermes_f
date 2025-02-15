import Icon from '@/components/general/Icon';
import { useState, useEffect, useRef } from 'react';
import AddTopic from './AddTopic';
import useCourseInformation from "@/hooks/course/useCourseInformation";
import useEditTopic from "@/hooks/course/useEditTopic";
import useDeleteTopic from "@/hooks/course/useDeleteTopic";
import { useModalContext } from '@/components/dashboard/Modal';
import FileDetails from '../filemanager/FileDetails';
import CustomInput from '../CustomInput';

const TopicList = ({ selectedCourse, setSelectedCourse }) => {

    const { courseInformationRequest } = useCourseInformation(setSelectedCourse);
    const { editTopicRequest } = useEditTopic(() => courseInformationRequest(selectedCourse._id));
    const { deleteTopicRequest } = useDeleteTopic(() => courseInformationRequest(selectedCourse._id));
    const { openModal, closeModal } = useModalContext();


    useEffect(() => {
        console.log(selectedCourse);
    }, [selectedCourse]);


    return (
        <div className={`flex flex-col gap-3 bg-primary mt-3 ${process.env.NEXT_PUBLIC_DIRECTION} p-3 rounded-md`}>
            {selectedCourse && selectedCourse?.courseMaterials.map((value, index) =>
                <div key={index} className='flex  grow h-fit justify-between   rounded-md p-3  border-2 border-solid border-blue-400 cursor-pointer select-none'>
                    <div className='relative flex items-center justify-center gap-2 pr-3'>
                        <span className="absolute right-[-27px] w-[29px] h-[29px] bg-primary border-2 border-gray-400 border-opacity-50 text-[16px] font-bold flex items-center  justify-center rounded-full leading-none ">
                            {value.order}
                        </span>
                        <CustomInput defaultValue={value.title} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                editTopicRequest(selectedCourse._id, value.file_id, e.target.value, value.order);
                            }
                        }} />
                        <div className="w-px h-full bg-gray-400"></div>
                        <div onClick={() => {
                            editTopicRequest(selectedCourse._id, value.file_id, value.title, value.order, true);
                        }}>
                            {value.file_id.isPrivate ?
                                <Icon name={"lock"} className="w-8 h-8 text-purple-400" />
                                :
                                <Icon name={"public"} className="w-8 h-8 text-yellow-400" />
                            }
                        </div>
                        <div onClick={() => {
                            deleteTopicRequest(selectedCourse._id, value.file_id)
                        }}>
                            <Icon name={"trash"} className="w-8 h-8 text-red-400" />
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-2' onClick={() => {
                        openModal(<FileDetails file={value.file_id} />)
                    }}>
                        <Icon name={"eye"} className="w-8 h-8 text-yellow-400" />
                    </div>
                </div>)}
            <AddTopic course_id={selectedCourse._id} refreshList={() => courseInformationRequest(selectedCourse._id)} />
        </div>
    );
};

export default TopicList;