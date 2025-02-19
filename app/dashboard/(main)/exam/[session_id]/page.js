'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from "react";
import useGetActiveExamSession from '@/hooks/examSession/useGetActiveExamSession';
import useUpdateQustionAnswer from '@/hooks/examSession/useUpdateQustionAnswer';
import Timer from '@/components/dashboard/Timer';

const ExamDetail = () => {
    const params = useParams();
    const { session_id } = params;
    const [examSession, setExamSession] = useState(null);
    const [loading, setLoading] = useState(true);

    // activeQuestionIndex: اگر برابر -1 شود یعنی همه سوالات پاسخ داده شده‌اند
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    const { updateQustionAnswerRequest } = useUpdateQustionAnswer();

    const { getActiveExamSessionRequest } = useGetActiveExamSession((session) => {
        setExamSession(session);
        setLoading(false);
        // در هنگام دریافت جلسه، اولین سوالی که پاسخ آن هنوز 0 است، به عنوان سوال فعال انتخاب شود.
        const firstUnanswered = session.questions.findIndex(q => q.answer === 0);
        setActiveQuestionIndex(firstUnanswered);
    });

    useEffect(() => {
        if (session_id) {
            getActiveExamSessionRequest(session_id);
        }
    }, [session_id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg">در حال بارگذاری...</p>
            </div>
        );
    }

    if (!examSession) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-red-500">جلسه آزمونی یافت نشد.</p>
            </div>
        );
    }

    // به‌روزرسانی پاسخ یک سوال در state
    const handleAnswerChange = (questionIndex, selectedValue) => {
        setExamSession((prevSession) => {
            const updatedQuestions = prevSession.questions.map((q, index) => {
                if (index === questionIndex) {
                    return { ...q, answer: selectedValue };
                }
                return q;
            });
            return { ...prevSession, questions: updatedQuestions };
        });
    };

    // ثبت پاسخ سوال فعلی و تعیین سوال فعال بعدی (اولین سوالی که هنوز پاسخ 0 دارد)
    const handleSubmitAnswer = () => {
        const currentQuestion = examSession.questions[activeQuestionIndex];
        const answer = currentQuestion.answer;
        updateQustionAnswerRequest({
            sessionId: session_id,
            questionIndex: activeQuestionIndex,
            answer
        });
        // یافتن اولین سوالی که هنوز پاسخ داده نشده (یعنی answer === 0)
        const nextUnansweredIndex = examSession.questions.findIndex(q => q.answer === 0);
        setActiveQuestionIndex(nextUnansweredIndex);
    };

    return (
        <div className="flex grow flex-col overflow-y-auto p-3">
            <div className='rtl'>
                <Timer initialTime={examSession.exam_id.duration} TimerEndListener={() => {
                    // عملیات در پایان تایمر
                }} />
            </div>
            <div className='rtl'>
                {examSession.questions && examSession.questions.length > 0 ? (
                    examSession.questions.map((q, index) => {
                        const { question_id: { question, options } } = q;
                        const currentAnswer = q.answer; // مقدار فعلی پاسخ انتخاب شده
                        const containerClasses = index === activeQuestionIndex
                            ? "flex flex-col bg-primary p-3 rounded-md gap-3 mb-4"
                            : "flex flex-col bg-primary p-3 rounded-md gap-3 mb-4 opacity-50";

                        return (
                            <div key={index} className={containerClasses}>
                                <div className="font-semibold">{question}</div>
                                <div>
                                    <div className="flex items-center mb-1 gap-2">
                                        <input
                                            type="radio"
                                            id={`question-${index}-option-1`}
                                            name={`question-${index}`}
                                            value={1}
                                            checked={currentAnswer === 1}
                                            onChange={() => handleAnswerChange(index, 1)}
                                            className="mr-2"
                                            disabled={index !== activeQuestionIndex}
                                        />
                                        <label htmlFor={`question-${index}-option-1`}>{options[0]}</label>
                                    </div>
                                    <div className="flex items-center mb-1 gap-2">
                                        <input
                                            type="radio"
                                            id={`question-${index}-option-2`}
                                            name={`question-${index}`}
                                            value={2}
                                            checked={currentAnswer === 2}
                                            onChange={() => handleAnswerChange(index, 2)}
                                            className="mr-2"
                                            disabled={index !== activeQuestionIndex}
                                        />
                                        <label htmlFor={`question-${index}-option-2`}>{options[1]}</label>
                                    </div>
                                    <div className="flex items-center mb-1 gap-2">
                                        <input
                                            type="radio"
                                            id={`question-${index}-option-3`}
                                            name={`question-${index}`}
                                            value={3}
                                            checked={currentAnswer === 3}
                                            onChange={() => handleAnswerChange(index, 3)}
                                            className="mr-2"
                                            disabled={index !== activeQuestionIndex}
                                        />
                                        <label htmlFor={`question-${index}-option-3`}>{options[2]}</label>
                                    </div>
                                    <div className="flex items-center mb-1 gap-2">
                                        <input
                                            type="radio"
                                            id={`question-${index}-option-4`}
                                            name={`question-${index}`}
                                            value={4}
                                            checked={currentAnswer === 4}
                                            onChange={() => handleAnswerChange(index, 4)}
                                            className="mr-2"
                                            disabled={index !== activeQuestionIndex}
                                        />
                                        <label htmlFor={`question-${index}-option-4`}>{options[3]}</label>
                                    </div>
                                </div>
                                {index === activeQuestionIndex && (
                                    <button
                                        onClick={handleSubmitAnswer}
                                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                    >
                                        {activeQuestionIndex === -1 || examSession.questions.findIndex(q => q.answer === 0) === -1
                                            ? "ثبت پاسخ و پایان آزمون"
                                            : "ثبت پاسخ و رفتن به سوال بعدی"}
                                    </button>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p>هیچ سوالی ثبت نشده است.</p>
                )}
            </div>
        </div>
    );
};

export default ExamDetail;
