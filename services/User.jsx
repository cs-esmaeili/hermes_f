import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}user`

export const userList = (data) => {
    return http.post(`${prefixUrl}/userList`, JSON.stringify(data));
};
export const searchUser = (data) => {
    return http.post(`${prefixUrl}/searchUser`, JSON.stringify(data));
};
export const securityCheck = (data) => {
    return http.post(`${prefixUrl}/securityCheck`, JSON.stringify(data));
};

export const userInformation = (data) => {
    return http.post(`${prefixUrl}/userInformation`, JSON.stringify(data));
};

export const updateUserData = (data) => {
    return http.post(`${prefixUrl}/updateUserData`, JSON.stringify(data));
};

export const createUser = (data) => {
    return http.post(`${prefixUrl}/createUser`, JSON.stringify(data));
};

export const changeAvatar = (data, uploadLisener) => {
    return http.post(`${prefixUrl}/changeAvatar`, data, {
        onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            uploadLisener(percentCompleted);
        },
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};