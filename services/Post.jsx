import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}post`

export const createPost = (data) => {
    return http.post(`${prefixUrl}/createPost`, JSON.stringify(data));
};

export const postList = (data) => {
    return http.post(`${prefixUrl}/postList`, JSON.stringify(data));
};

export const deletePost = (data) => {
    return http.post(`${prefixUrl}/deletePost`, JSON.stringify(data));
};

export const updatePost = (data) => {
    return http.post(`${prefixUrl}/updatePost`, JSON.stringify(data));
};