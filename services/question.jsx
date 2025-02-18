import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}question`

export const createQuestion = (data) => {
    return http.post(`${prefixUrl}/createQuestion`, JSON.stringify(data));
};

export const getQuestions = (data) => {
    return http.post(`${prefixUrl}/getQuestions`, JSON.stringify(data));
};

export const updateQuestion = (data) => {
    return http.post(`${prefixUrl}/updateQuestion`, JSON.stringify(data));
};

export const deleteQuestion = (data) => {
    return http.post(`${prefixUrl}/deleteQuestion`, JSON.stringify(data));
};