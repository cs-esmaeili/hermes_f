import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}apibox`

export const apiBoxList = (data) => {
    return http.post(`${prefixUrl}/apiBoxList`, JSON.stringify(data));
};

export const addApiBox = (data) => {
    return http.post(`${prefixUrl}/addApiBox`, JSON.stringify(data));
};

export const updateApiBox = (data) => {
    return http.post(`${prefixUrl}/updateApiBox`, JSON.stringify(data));
};
