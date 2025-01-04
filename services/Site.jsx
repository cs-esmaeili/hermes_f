import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}site`


export const firstPage = () => {
    return http.post(`${prefixUrl}/firstPage`);
};

export const updateFirstPage = (data) => {
    return http.post(`${prefixUrl}/updateFirstPage`, JSON.stringify(data));
};

