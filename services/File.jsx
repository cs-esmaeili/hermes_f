import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}file`

export const uploadFile = (data) => {
    return http.post(`${prefixUrl}/uploadFile`, JSON.stringify(data));
};
export const deleteFile = (data) => {
    return http.post(`${prefixUrl}/deleteFile`, JSON.stringify(data));
};
export const rename = (data) => {
    return http.post(`${prefixUrl}/rename`, JSON.stringify(data));
};
export const createFolder = (data) => {
    return http.post(`${prefixUrl}/createFolder`, JSON.stringify(data));
};
export const deleteFolder = (data) => {
    return http.post(`${prefixUrl}/deleteFolder`, JSON.stringify(data));
};
export const listFiles = (data) => {
    return http.post(`${prefixUrl}/listFiles`, JSON.stringify(data));
};
export const downloadFile = (file_id) => {
    return http.get(`${prefixUrl}/${file_id}`);
};
