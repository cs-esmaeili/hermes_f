import http from "./httpServices";

const prefixUrl = `${process.env.NEXT_PUBLIC_API}ticket`

export const createTicket = (data) => {
    return http.post(`${prefixUrl}/createTicket`, JSON.stringify(data));
};

export const adminGetTicketById = (data) => {
    return http.post(`${prefixUrl}/adminGetTicketById`, JSON.stringify(data));
};

export const adminGetTickets = (data) => {
    return http.post(`${prefixUrl}/adminGetTickets`, JSON.stringify(data));
};

export const adminUpdateTicket = (data) => {
    return http.post(`${prefixUrl}/adminUpdateTicket`, JSON.stringify(data));
};


export const getTicketById = (data) => {
    return http.post(`${prefixUrl}/getTicketById`, JSON.stringify(data));
};

export const getTickets = (data) => {
    return http.post(`${prefixUrl}/getTickets`, JSON.stringify(data));
};

export const updateTicket = (data) => {
    return http.post(`${prefixUrl}/updateTicket`, JSON.stringify(data));
};
