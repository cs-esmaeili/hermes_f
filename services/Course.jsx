import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}course`

export const addCourse = (data, uploadLisener) => {
    return http.post(`${prefixUrl}/addCourse`, data, {
        onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            uploadLisener(percentCompleted);
        },
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
export const editCourse = (data, uploadLisener) => {
    return http.post(`${prefixUrl}/editCourse`, data, {
        onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            uploadLisener(percentCompleted);
        },
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const addTopic = (data, uploadLisener) => {
    return http.post(`${prefixUrl}/addTopic`, data, {
        onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            uploadLisener(percentCompleted);
        },
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const courseList = (data) => {
    return http.post(`${prefixUrl}/courseList`, JSON.stringify(data));
};


export const courseInformation = (data) => {
    return http.post(`${prefixUrl}/courseInformation`, JSON.stringify(data));
};

export const deleteTopic = (data) => {
    return http.post(`${prefixUrl}/deleteTopic`, JSON.stringify(data));
};

export const editTopic = (data) => {
    return http.post(`${prefixUrl}/editTopic`, JSON.stringify(data));
};


