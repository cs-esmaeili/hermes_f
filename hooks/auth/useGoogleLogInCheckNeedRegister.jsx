import { toast } from 'react-hot-toast';
import { googleLogInCheckNeedRegister } from '@/services/Auth';
import translation from '@/translation/translation';
import useSaveLogInData from '@/hooks/auth/useSaveLogInData';

const useGoogleLogInCheckNeedRegister = (setError, SetPage) => {

    const { saveData } = useSaveLogInData();

    const googleLogInCheckNeedRegisterRequest = async (email) => {
        try {
            const { data: { userName, token, sessionTime, message } } = await googleLogInCheckNeedRegister({ email });
            await saveData(token, sessionTime, userName);
            toast.success(message);

        } catch (error) {

            console.log(error);
            if (error?.response?.data?.message == "Need Register") {
                SetPage("firstLogInWithGoogle");
            } else if (error?.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError(translation.get('someThingIsWrong'));
            }
        }
    };

    return { googleLogInCheckNeedRegisterRequest };
};

export default useGoogleLogInCheckNeedRegister;
