import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}ticket`

export const createTicket = (data) => {
    return http.post(`${prefixUrl}/createTicket`, JSON.stringify(data));
};
