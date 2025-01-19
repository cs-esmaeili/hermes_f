import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}file`

export const deleteFile = (data) => {
    return http.post(`${prefixUrl}/deleteFile`, JSON.stringify(data));
};
export const renameFolder = (data) => {
    return http.post(`${prefixUrl}/renameFolder`, JSON.stringify(data));
};
export const renameFile = (data) => {
    return http.post(`${prefixUrl}/renameFile`, JSON.stringify(data));
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

export const uploadFile = (data, uploadLisener) => {
    return http.post(`${prefixUrl}/uploadFile`, data, {
        onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            uploadLisener(percentCompleted);
        },
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};