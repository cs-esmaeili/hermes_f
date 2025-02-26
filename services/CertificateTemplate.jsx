import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}certificateTemplate`

export const getCertificateTemplates = (data) => {
    return http.post(`${prefixUrl}/getCertificateTemplates`, JSON.stringify(data));
};

