import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}category`

export const createCategory = (data) => {
    return http.post(`${prefixUrl}/createCategory`, JSON.stringify(data));
};
export const categoryList = (data) => {
    return http.post(`${prefixUrl}/categoryList`, JSON.stringify(data));
};
export const deleteCategory = (data) => {
    return http.post(`${prefixUrl}/deleteCategory`, JSON.stringify(data));
};
export const updateCategory = (data) => {
    return http.post(`${prefixUrl}/updateCategory`, JSON.stringify(data));
};

export const getCategoryData = (data) => {
    return http.post(`${prefixUrl}/getCategoryData`, JSON.stringify(data));
};

export const categorys = () => {
    return http.post(`${prefixUrl}/categorys`);
};
