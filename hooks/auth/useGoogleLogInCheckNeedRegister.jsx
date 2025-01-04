import { toast } from 'react-hot-toast';
import { googleLogInCheckNeedRegister } from '@/services/Auth';
import translation from '@/translation/translation';
import useSaveLogInData from '@/hooks/auth/useSaveLogInData';
import useGoDashboard from '@/hooks/auth/useGoDashboard';

const useGoogleLogInCheckNeedRegister = (setError, SetPage, setLoadingMain) => {

    const { saveData } = useSaveLogInData();
    const { goToDashboard } = useGoDashboard();

    const googleLogInCheckNeedRegisterRequest = async (email, accessToken) => {
        try {
            const { data: { userName, token, sessionTime, message } } = await googleLogInCheckNeedRegister({ email, accessToken });
            await saveData(token, sessionTime, userName);
            toast.success(message);
            setLoadingMain(true);
            goToDashboard();
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
