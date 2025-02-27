'use client'

import { useState, useEffect, useRef } from 'react';
import DivButton from '../DivButton';
import { useModalContext } from '@/components/dashboard/Modal';
import Exam from './Exam';
import CustomInput from '../CustomInput';
import useCreateQustion from '@/hooks/question/useCreateQustion';
import useUpdateQustion from '@/hooks/question/useUpdateQustion';
import Table from '@/components/dashboard/Table';
import Pagination from '@/components/dashboard/Pagination';
import { BiSolidEdit } from 'react-icons/bi';
import useQuestionList from '@/hooks/question/useQuestionList';

const convertSelectedQutionToFormData = (selectedQustion) => {
    return {
        question_id: selectedQustion?._id || "",
        exam_id: selectedQustion?._id || "",
        question: selectedQustion?.question || "",
        options: selectedQustion?.options?.length ? selectedQustion.options : ["", "", "", ""],
        correctOption: selectedQustion?.correctOption || 1,
        examTitle: selectedQustion?.examTitle || selectedQustion?.exam_id?.title || "",
    };
}


const Question = ({ setParentLoading }) => {

    const { openModal, closeModal } = useModalContext();
    const [formData, setFormData] = useState(convertSelectedQutionToFormData(null));

    const [questions, setQuestions] = useState(null);
    const [questionCount, setQuestionCount] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(12);



    const { questionListRequest } = useQuestionList(({ questions, questionCount }) => {
        setQuestionCount(questionCount);
        setQuestions(questions);
    }, page, perPage);

    const { updateQustionRequest } = useUpdateQustion(() => {
        setFormData(convertSelectedQutionToFormData(null));
        questionListRequest();
    });

    const { CreateQustionRequest } = useCreateQustion(() => {
        setFormData(convertSelectedQutionToFormData(null));
        questionListRequest();
    });

    useEffect(() => {
        setParentLoading(false);
        questionListRequest();
    }, []);

    useEffect(() => {
        questionListRequest();
    }, [page]);

    const handleInputChange = (field) => (e) => {
        if (field.startsWith("options[")) {
            const index = Number(field.match(/\d+/)[0]);
            setFormData((prevData) => {
                const updatedOptions = [...prevData.options];
                updatedOptions[index] = e.target.value;
                return { ...prevData, options: updatedOptions };
            });
        } else {
            setFormData({ ...formData, [field]: e.target.value });
        }
    };


    return (
        <div className='flex flex-col gap-3 grow overflow-y-auto'>
            <CustomInput rightLabel="متن سوال" value={formData.question} onChange={handleInputChange('question')} />
            <div className='flex gap-3 justify-between rtl'>
                <div className='flex w-1/2 items-end'>
                    <DivButton className='bg-red-500 justify-center' onClick={() => {
                        openModal(<Exam pickMode setParentLoading={() => { }} examPicker={(exam) => {
                            setFormData({ ...formData, examTitle: exam.title, exam_id: exam._id });
                            closeModal();
                        }} />)
                    }}>{formData.examTitle ? formData.examTitle : "انتخاب آزمون"}</DivButton>
                </div>
                <div className='w-1/2'>
                    <CustomInput rightLabel="جواب صحیح" containerClassName="" value={formData.correctOption} onChange={handleInputChange('correctOption')} />
                </div>
            </div>

            <CustomInput rightLabel="گزینه 1" value={formData.options[0]} onChange={handleInputChange('options[0]')} />
            <CustomInput rightLabel="گزینه 2" value={formData.options[1]} onChange={handleInputChange('options[1]')} />
            <CustomInput rightLabel="گزینه 3" value={formData.options[2]} onChange={handleInputChange('options[2]')} />
            <CustomInput rightLabel="گزینه 4" value={formData.options[3]} onChange={handleInputChange('options[3]')} />


            <DivButton className={`bg-green-500 justify-center ${formData?.question_id && "bg-yellow-500"}`} onClick={() => {
                if (formData?.question_id) {
                    updateQustionRequest(formData);
                } else {
                    CreateQustionRequest(formData);
                }
            }}>{(formData?.question_id) ? "ثبت" : "ایجاد سوال"}</DivButton>

            {questions &&
                <Table
                    headers={["برای آزمون", "سوال"]}
                    rowsData={["exam_id.title", "question"]}
                    rows={questions}
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
                                    setFormData(convertSelectedQutionToFormData(rowData));
                                }} />
                            </div>
                        );
                    }}
                    rowCountstart={(perPage * (page - 1))}
                />
            }
            <Pagination activePage={page} perPage={perPage} count={questionCount} setActivePage={setPage} />
        </div>
    );
};

export default Question;