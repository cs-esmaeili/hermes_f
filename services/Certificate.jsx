import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}certificate`

export const deleteCertificate = (data) => {
    return http.post(`${prefixUrl}/deleteCertificate`, JSON.stringify(data));
};
export const getAllCertificates = (data) => {
    return http.post(`${prefixUrl}/getAllCertificates`, JSON.stringify(data));
};
export const getCertificateById = (data) => {
    return http.post(`${prefixUrl}/getCertificateById`, JSON.stringify(data));
};

export const createCertificate = (data, uploadLisener) => {
    return http.post(`${prefixUrl}/createCertificate`, data, {
        onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            uploadLisener(percentCompleted);
        },
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
export const updateCertificate = (data, uploadLisener) => {
    return http.post(`${prefixUrl}/updateCertificate`, data, {
        onUploadProgress: function (progressEvent) {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            uploadLisener(percentCompleted);
        },
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};