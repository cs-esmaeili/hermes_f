'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from "react";
import useGetActiveExamSession from '@/hooks/examSession/useGetActiveExamSession';
import useUpdateQustionAnswer from '@/hooks/examSession/useUpdateQustionAnswer';
import Timer from '@/components/dashboard/Timer';
import { useRouter } from 'next/navigation';

const ExamDetail = () => {
    const params = useParams();
    const { session_id } = params;
    const [examSession, setExamSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const { push } = useRouter();

    // activeQuestionIndex: اگر برابر -1 شود یعنی هیچ سوال فعالی وجود ندارد
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    const { updateQustionAnswerRequest } = useUpdateQustionAnswer();

    const { getActiveExamSessionRequest } = useGetActiveExamSession(
        (session) => {
            setExamSession(session);
            setLoading(false);
            // تنظیم اولین سوالی که پاسخی ثبت نشده است (null یا "unanswered")
            const firstUnanswered = session.questions.findIndex(
                q => q.answer === null || q.answer === "unanswered"
            );
            setActiveQuestionIndex(firstUnanswered);
        },
        () => {
            setLoading(false);
            push('/dashboard');
        }
    );

    useEffect(() => {
        if (session_id) {
            getActiveExamSessionRequest(session_id);
        }
    }, [session_id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen rtl">
                <p className="text-lg">در حال بارگذاری...</p>
            </div>
        );
    }

    if (!examSession) {
        return (
            <div className="flex justify-center items-center h-screen rtl">
                <p className="text-lg text-red-500">جلسه آزمونی یافت نشد.</p>
            </div>
        );
    }

    // محاسبه تعداد سوالات بدون پاسخ: فقط سوالاتی که هنوز پاسخی ثبت نشده‌اند (answer === null)
    const remainingQuestionsCount = examSession.questions.filter(
        q => q.answer === null
    ).length;

    // به‌روزرسانی پاسخ یک سوال در state
    const handleAnswerChange = (questionIndex, selectedValue) => {
        setExamSession(prevSession => {
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
                    // اگر پاسخی انتخاب نشده باشد، مقدار را به "unanswered" تغییر می‌دهیم
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
            // پیدا کردن اولین سوالی که هنوز پاسخی ثبت نشده است (یعنی answer === null)
            const nextUnansweredIndex = updatedQuestions.findIndex(q => q.answer === null);
            // اگر سوال فعال آخر باشد یا دیگر سوال بدون پاسخ وجود نداشته باشد، activeQuestionIndex را به -1 تنظیم می‌کنیم
            if (activeQuestionIndex === prevSession.questions.length - 1 || nextUnansweredIndex === -1) {
                setActiveQuestionIndex(-1);
            } else {
                setActiveQuestionIndex(nextUnansweredIndex);
            }
            return { ...prevSession, questions: updatedQuestions };
        });
    };

    // تعیین اینکه آیا سوال فعال آخر است
    const isLastQuestion = activeQuestionIndex === examSession.questions.length - 1;
    // اگر activeQuestionIndex برابر -1 باشد یا دیگر سوال بدون پاسخ (answer === null) موجود نباشد، آزمون پایان یافته است.
    const isExamFinished = activeQuestionIndex === -1 ||
        examSession.questions.findIndex(q => q.answer === null) === -1;

    return (
        <div className="flex grow flex-col overflow-y-auto p-3 gap-3 rtl">
            {/* Header */}
            <div className="flex flex-col items-center gap-2 p-4 shadow rounded bg-primary">
                <h2 className="text-2xl font-bold text-textcolor">{examSession.exam_id.title}</h2>
                <p className="text-lg text-textcolor">تعداد سوالات: {examSession.exam_id.questionCount}</p>
                <p className="text-lg text-textcolor">سوالات باقی مانده: {remainingQuestionsCount}</p>
                <div className="mt-4">
                    <Timer
                        initialTime={examSession.exam_id.duration}
                        TimerEndListener={() => {
                            // عملیات در پایان تایمر
                        }}
                    />
                </div>
            </div>

            {/* سوالات */}
            <div className="rtl select-none">
                {examSession.questions && examSession.questions.length > 0 ? (
                    examSession.questions.map((q, index) => {
                        const { question_id: { question, options } } = q;
                        const currentAnswer = q.answer; // مقدار فعلی پاسخ ثبت شده (مثلاً "1"، "unanswered" یا null)
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
                                            backgroundColor: isLastQuestion ? '#ef4444' : '#3b82f6',
                                            color: '#ffffff',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '0.375rem',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {isLastQuestion
                                            ? "ثبت پاسخ و پایان آزمون"
                                            : "ثبت پاسخ"}
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
