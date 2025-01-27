// services/socketService.js
import { io } from 'socket.io-client';
import { getCookie } from 'cookies-next';

let socket;

export const initializeSocket = () => {
    const token = decodeURIComponent(getCookie('token'));
    if (!token) {
        console.error('No token available for socket connection');
        return;
    }

    socket = io(process.env.NEXT_PUBLIC_API, {
        query: { token }
    });

    return socket;
};

export const getSocket = () => {
    if (!socket) {
        initializeSocket();
    }
    return socket;
};

export const emitEvent = (eventName, data) => {
    if (socket) {
        socket.emit(eventName, data);
    } else {
        console.error('Socket connection not established');
    }
};
