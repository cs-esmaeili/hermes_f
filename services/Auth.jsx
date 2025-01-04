import http from "./httpServices";
import config from "../config.json";

const prefixUrl = `${config.api}auth`

export const logInWithPassword = (data) => {
    return http.post(`${prefixUrl}/logInWithPassword`, JSON.stringify(data));
};
export const logInPhoneStepOne = (data) => {
    return http.post(`${prefixUrl}/logInPhoneStepOne`, JSON.stringify(data));
};
export const logInPhoneStepTwo = (data) => {
    return http.post(`${prefixUrl}/logInPhoneStepTwo`, JSON.stringify(data));
};


export const resetPasswordStepOne = (data) => {
    return http.post(`${prefixUrl}/resetPasswordStepOne`, JSON.stringify(data));
};
export const resetPasswordStepTwo = (data) => {
    return http.post(`${prefixUrl}/resetPasswordStepTwo`, JSON.stringify(data));
};


export const googleLogInCheckNeedRegister = (data) => {
    return http.post(`${prefixUrl}/googleLogInCheckNeedRegister`, JSON.stringify(data));
};

export const firstLogInWithGoogleStepOne = (data) => {
    return http.post(`${prefixUrl}/firstLogInWithGoogleStepOne`, JSON.stringify(data));
};

export const firstLogInWithGoogleStepTwo = (data) => {
    return http.post(`${prefixUrl}/firstLogInWithGoogleStepTwo`, JSON.stringify(data));
};
