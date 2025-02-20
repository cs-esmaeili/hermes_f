import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}examSessions`

export const startExam = (data) => {
    return http.post(`${prefixUrl}/startExam`, JSON.stringify(data));
};

export const getActiveExamSession = (data) => {
    return http.post(`${prefixUrl}/getActiveExamSession`, JSON.stringify(data));
};

export const updateQustionAnswer = (data) => {
    return http.post(`${prefixUrl}/updateQustionAnswer`, JSON.stringify(data));
};

export const getExamSession = (data) => {
    return http.post(`${prefixUrl}/getExamSession`, JSON.stringify(data));
};

export const getExamSessions = (data) => {
    return http.post(`${prefixUrl}/getExamSessions`, JSON.stringify(data));
};
