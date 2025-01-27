import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}approval`

export const approvalList = (data) => {
    return http.post(`${prefixUrl}/approvalList`, JSON.stringify(data));
};
