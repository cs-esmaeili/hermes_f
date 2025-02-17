import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}exam`

export const createExam = (data) => {
    return http.post(`${prefixUrl}/createExam`, JSON.stringify(data));
};

export const getExams = (data) => {
    return http.post(`${prefixUrl}/getExams`, JSON.stringify(data));
};

export const getExamById = (data) => {
    return http.post(`${prefixUrl}/getExamById`, JSON.stringify(data));
};

export const updateExam = (data) => {
    return http.post(`${prefixUrl}/updateExam`, JSON.stringify(data));
};

export const deleteExam = (data) => {
    return http.post(`${prefixUrl}/deleteExam`, JSON.stringify(data));
};