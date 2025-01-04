import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}smsHistory`

export const smsHistoryList = (data) => {
    return http.post(`${prefixUrl}/smsHistoryList`, JSON.stringify(data));
};

export const deleteCategory = (data) => {
    return http.post(`${prefixUrl}/deleteCategory`, JSON.stringify(data));
};
