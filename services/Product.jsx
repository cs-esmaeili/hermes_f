import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}product`

export const productList = (data) => {
    return http.post(`${prefixUrl}/productList`, JSON.stringify(data));
};

export const createProduct = (data) => {
    return http.post(`${prefixUrl}/createProduct`, JSON.stringify(data));
};

export const updateProduct = (data) => {
    return http.post(`${prefixUrl}/updateProduct`, JSON.stringify(data));
};

export const searchProduct = (data) => {
    return http.post(`${prefixUrl}/searchProduct`, JSON.stringify(data));
};