import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}examSession`

export const startExam = (data) => {
    return http.post(`${prefixUrl}/startExam`, JSON.stringify(data));
};
