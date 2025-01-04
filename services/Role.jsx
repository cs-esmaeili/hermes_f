import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}role`

export const roleList = () => {
    return http.post(`${prefixUrl}/roleList`);
};

export const createRole = (data) => {
    return http.post(`${prefixUrl}/createRole`, JSON.stringify(data));
};
export const deleteRole = (data) => {
    return http.post(`${prefixUrl}/deleteRole`, JSON.stringify(data));
};
