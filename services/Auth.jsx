import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api}auth`

export const createOrLoginWithPassword = (data) => {
    return http.post(`${prefixUrl}/createOrLoginWithPassword`, JSON.stringify(data));
};
export const logInPhoneStepOne = (data) => {
    return http.post(`${prefixUrl}/logInPhoneStepOne`, JSON.stringify(data));
};
export const logInPhoneStepTwo = (data) => {
    return http.post(`${prefixUrl}/logInPhoneStepTwo`, JSON.stringify(data));
};
