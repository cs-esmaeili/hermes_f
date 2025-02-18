'use client'

import { useState, useEffect, useRef } from 'react';
import CustomInput from '@/components/dashboard/CustomInput';
import useCreateExam from '@/hooks/exam/useCreateExam';
import useUpdateExam from '@/hooks/exam/useUpdateExam';
import useGetExams from '@/hooks/exam/useGetExams';
import DivButton from '../DivButton';
import Table from '@/components/dashboard/Table';
import Pagination from '@/components/dashboard/Pagination';
import { BiSolidEdit } from 'react-icons/bi';


const converSelectedExamToFormData = (selectedExam) => {
    return {
        title: selectedExam?.title || "",
        duration: selectedExam?.duration || "",
        questionCount: selectedExam?.questionCount || "",
        exam_id: selectedExam?._id || null,
    }
}

const Exam = ({ setParentLoading, pickMode = false, examPicker = null }) => {

    const [formData, setFormData] = useState(converSelectedExamToFormData(null));

    const [selectedExam, setSelectedExam] = useState(null);
    const [exams, setExams] = useState(null);
    const [examCount, setExamCount] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(12);

    const { getExamsRequest } = useGetExams(({ examCount, exams }) => {
        setExams(exams);
        setExamCount(examCount);
    }, page, perPage);

    const { updateExamRequest } = useUpdateExam(() => {
        setFormData(converSelectedExamToFormData(null));
        setSelectedExam(null);
        getExamsRequest();
    });

    const { CreateExamRequest } = useCreateExam(() => {
        setFormData(converSelectedExamToFormData(null));
        getExamsRequest();
    });

    const handleInputChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    useEffect(() => {
        getExamsRequest();
        setParentLoading(false);
    }, []);

    useEffect(() => {
        if (selectedExam) setFormData(converSelectedExamToFormData(selectedExam))
    }, [selectedExam]);


    return (
        <div className='flex flex-col gap-3 bg-primary p-3  rounded-lg'>
            {!pickMode &&
                <>
                    <div className='flex grow flex-wrap md:flex-nowrap gap-3  justify-between rtl'>
                        <CustomInput rightLabel="عنوان" inputClassName={"bg-secondary"} containerClassName={"w-full"}
                            value={formData.title} onChange={handleInputChange('title')} />
                        <CustomInput rightLabel="زمان امتحان" inputClassName={"bg-secondary"} containerClassName={"w-full"}
                            value={formData.duration} onChange={handleInputChange('duration')} />
                        <CustomInput rightLabel="تعداد سوالات" inputClassName={"bg-secondary"} containerClassName={"w-full"}
                            value={formData.questionCount} onChange={handleInputChange('questionCount')} />
                    </div>
                    <DivButton className={`w-full bg-green-500 justify-center ${selectedExam && "bg-yellow-500"}`} onClick={() => {
                        if (selectedExam) {
                            updateExamRequest(formData)
                        } else {
                            CreateExamRequest(formData);
                        }
                    }}>{(selectedExam) ? "ثبت تغییرات" : "ایجاد"}</DivButton>

                </>}
            <div className='flex flex-col grow'>
                <div className='flex grow w-full overflow-x-scroll '>
                    {exams &&
                        <Table
                            headers={["ID", "updatedAt", "duration", "questionCount", "title"]}
                            rowsData={["_id", "updatedAt", "duration", "questionCount", "title"]}
                            rows={exams}
                            rowClasses={(row, rowIndex) => {
                                return "bg-primary";
                            }}
                            cellClasses={(cell, cellIndex, row, rowIndex) => {
                                return cell == "ارسال شده" && "text-green-400";
                            }}
                            selectListener={(row, index) => {
                                if (pickMode && examPicker) examPicker(row);
                            }}
                            actionComponent={({ rowData, rowIndex }) => {
                                return (
                                    <div className="flex h-full items-center justify-center gap-2 text-nowrap">
                                        {!pickMode &&
                                            <BiSolidEdit className='text-xl ml-4 text-blue-400' onClick={() => {
                                                setSelectedExam(rowData);
                                            }} />
                                        }
                                    </div>
                                );
                            }}
                            rowCountstart={(perPage * (page - 1))}
                        />
                    }
                </div>
                <Pagination activePage={page} perPage={perPage} count={examCount} setActivePage={setPage} />
            </div>

        </div>
    );
};

export default Exam;