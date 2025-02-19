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

    // activeQuestionIndex: اگر برابر -1 شود یعنی هیچ سوال فعالی وجود ندارد
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    const { updateQustionAnswerRequest } = useUpdateQustionAnswer();

    const { getActiveExamSessionRequest } = useGetActiveExamSession((session) => {
        setExamSession(session);
        setLoading(false);
        // اولین سوالی که هنوز پاسخی ثبت نشده است (answer === null) را به عنوان سوال فعال انتخاب می‌کنیم
        const firstUnanswered = session.questions.findIndex(q => q.answer === null);
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
            const updatedQuestions = prevSession.questions.map((q, idx) => {
                if (idx === questionIndex) {
                    return { ...q, answer: selectedValue };
                }
                return q;
            });
            return { ...prevSession, questions: updatedQuestions };
        });
    };

    // ثبت پاسخ سوال فعلی و تعیین سوال فعال بعدی
    const handleSubmitAnswer = () => {
        setExamSession(prevSession => {
            const updatedQuestions = prevSession.questions.map((q, idx) => {
                if (idx === activeQuestionIndex) {
                    // اگر کاربر پاسخی انتخاب نکرده باشد، مقدار را به "unanswered" تغییر می‌دهیم
                    const newAnswer = (q.answer === null || q.answer === undefined) ? "unanswered" : q.answer;
                    return { ...q, answer: newAnswer };
                }
                return q;
            });
            // ارسال درخواست آپدیت به سرور
            updateQustionAnswerRequest({
                sessionId: session_id,
                questionIndex: activeQuestionIndex,
                answer: updatedQuestions[activeQuestionIndex].answer
            });
            // پیدا کردن اولین سوالی که هنوز پاسخی ثبت نشده (فقط شرط q.answer === null)
            const nextUnansweredIndex = updatedQuestions.findIndex(q => q.answer === null);
            if (activeQuestionIndex === prevSession.questions.length - 1 || nextUnansweredIndex === -1) {
                setActiveQuestionIndex(-1);
            } else {
                setActiveQuestionIndex(nextUnansweredIndex);
            }
            return { ...prevSession, questions: updatedQuestions };
        });
    };

    const isExamFinished = activeQuestionIndex === -1 || examSession.questions.findIndex(q => q.answer === null) === -1;
    const isLastQuestion = activeQuestionIndex === examSession.questions.length - 1;

    return (
        <div className="flex grow flex-col overflow-y-auto p-3">
            <div className='rtl'>
                <Timer
                    initialTime={examSession.exam_id.duration}
                    TimerEndListener={() => {
                        // عملیات در پایان تایمر
                    }}
                />
            </div>
            <div className='rtl'>
                {examSession.questions && examSession.questions.length > 0 ? (
                    examSession.questions.map((q, index) => {
                        const { question_id: { question, options } } = q;
                        const currentAnswer = q.answer;
                        const containerClasses = index === activeQuestionIndex
                            ? "flex flex-col bg-primary p-3 rounded-md gap-3 mb-4"
                            : "flex flex-col bg-primary p-3 rounded-md gap-3 mb-4 opacity-50";

                        return (
                            <div
                                key={index}
                                className={containerClasses}
                                style={index !== activeQuestionIndex ? { pointerEvents: 'none' } : {}}
                            >
                                <div className="font-semibold">{question}</div>
                                <div>
                                    <div className="flex items-center mb-1 gap-2">
                                        <input
                                            type="radio"
                                            id={`question-${index}-option-1`}
                                            name={`question-${index}`}
                                            value="1"
                                            checked={currentAnswer === "1"}
                                            onChange={() => handleAnswerChange(index, "1")}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`question-${index}-option-1`}>{options[0]}</label>
                                    </div>
                                    <div className="flex items-center mb-1 gap-2">
                                        <input
                                            type="radio"
                                            id={`question-${index}-option-2`}
                                            name={`question-${index}`}
                                            value="2"
                                            checked={currentAnswer === "2"}
                                            onChange={() => handleAnswerChange(index, "2")}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`question-${index}-option-2`}>{options[1]}</label>
                                    </div>
                                    <div className="flex items-center mb-1 gap-2">
                                        <input
                                            type="radio"
                                            id={`question-${index}-option-3`}
                                            name={`question-${index}`}
                                            value="3"
                                            checked={currentAnswer === "3"}
                                            onChange={() => handleAnswerChange(index, "3")}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`question-${index}-option-3`}>{options[2]}</label>
                                    </div>
                                    <div className="flex items-center mb-1 gap-2">
                                        <input
                                            type="radio"
                                            id={`question-${index}-option-4`}
                                            name={`question-${index}`}
                                            value="4"
                                            checked={currentAnswer === "4"}
                                            onChange={() => handleAnswerChange(index, "4")}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`question-${index}-option-4`}>{options[3]}</label>
                                    </div>
                                </div>
                                {index === activeQuestionIndex && (
                                    <button
                                        onClick={handleSubmitAnswer}
                                        style={{
                                            marginTop: '1rem',
                                            backgroundColor: isExamFinished ? '#ef4444' : '#3b82f6',
                                            color: '#ffffff',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '0.375rem',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {isExamFinished ? "ثبت پاسخ و پایان آزمون" : "ثبت پاسخ"}
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
