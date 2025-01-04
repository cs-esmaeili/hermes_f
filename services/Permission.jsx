import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}permission`

export const togglePermission = (data) => {
    return http.post(`${prefixUrl}/togglePermission`, JSON.stringify(data));
};
