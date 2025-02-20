'use client';

import { useState, useEffect } from 'react';
import useGetExamSession from '@/hooks/examSession/useGetExamSession';

const ExamResults = ({ session_id }) => {

    const [examSession, setExamSession] = useState(null);
    const [loading, setLoading] = useState(true);

    const { getExamSessionRequest } = useGetExamSession((examSession) => {
        console.log(examSession);
        setExamSession(examSession);
        setLoading(false);
    }, (err) => {
        setLoading(false);
    });

    useEffect(() => {
        if (session_id) {
            getExamSessionRequest(session_id);
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

    return (
        <div className="flex grow flex-col overflow-y-auto overflow-x-hidden p-3">
            <div className="flex flex-col items-center gap-2 p-4 shadow rounded bg-primary rtl">
                <h2 className="text-2xl font-bold text-textcolor">{examSession.exam_id.title}</h2>
                <p className="text-lg text-textcolor">تعداد سوالات: {examSession.exam_id.questionCount}</p>
                <p className="text-lg text-textcolor">نمره: {examSession.score}</p>
                <p className="text-lg text-textcolor">وضعیت: {examSession.status}</p>
            </div>

            <div className="mt-6 rtl">
                {examSession.questions.map((q, index) => {
                    const questionText = q.question_id.question;
                    const options = q.question_id.options;
                    const userAnswer = q.answer;
                    const correctAnswer = q.question_id.correctOption; // فرض بر این است که به صورت رشته ذخیره شده است


                    return (
                        <div key={index} className={`${(userAnswer == correctAnswer) ? "bg-green-500" : "bg-red-500"} p-3 rounded mb-4 bg-opacity-50`}>
                            <p className="font-semibold">سوال {index + 1}: {questionText}</p>
                            <div className="list-disc ml-4 mt-2">
                                {options.map((opt, i) => {
                                    return (
                                        <div key={i} className="text-textcolor">
                                            {opt}
                                        </div>
                                    );
                                })}
                            </div>
                            <p className="mt-2">
                                پاسخ شما: {userAnswer && userAnswer !== "unanswered" ? userAnswer : "پاسخ داده نشده"}
                            </p>
                            <p>
                                پاسخ صحیح: {correctAnswer}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ExamResults;
