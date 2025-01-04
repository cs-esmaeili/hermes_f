import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}smsTemplate`

export const smsTemplateList = () => {
    return http.post(`${prefixUrl}/SmsTemplateList`);
};
export const deleteSmsTemplate = (data) => {
    return http.post(`${prefixUrl}/deleteSmsTemplate`, JSON.stringify(data));
};
export const createSmsTemplate = (data) => {
    return http.post(`${prefixUrl}/createSmsTemplate`, JSON.stringify(data));
};

export const sendSmsToUser = (data) => {
    return http.post(`${prefixUrl}/sendSmsToUser`, JSON.stringify(data));
};

export const cancelSendSmsToUser = (data) => {
    return http.post(`${prefixUrl}/cancelSendSmsToUser`, JSON.stringify(data));
};