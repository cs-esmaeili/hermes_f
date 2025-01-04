import http from "./httpServices";


const prefixUrl = `${process.env.NEXT_PUBLIC_API}factor`

export const factorListUser = (data) => {
    return http.post(`${prefixUrl}/factorListUser`, JSON.stringify(data));
};
export const changeFactorStatus = (data) => {
    return http.post(`${prefixUrl}/changeFactorStatus`, JSON.stringify(data));
};