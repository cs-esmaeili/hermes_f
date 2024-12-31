import { setCookie } from 'cookies-next';
import { useDispatch } from 'react-redux';
import { setlogOutTime } from '@/state/logOutTime';
import axios from "axios";

const useSaveLogInData = () => {

    const dispatch = useDispatch();


    const saveData = async (token, sessionTime, userName) => {

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        let expObj = { expires: new Date(new Date().getTime() + parseInt(sessionTime) * 60000) };
        setCookie('token', token, expObj);
        setCookie('userName', userName, expObj);
        setCookie('sessionTime', sessionTime, expObj);
        dispatch(setlogOutTime(new Date().toISOString()));
   
    };

    return {
        saveData
    };
};

export default useSaveLogInData;
