import { toast } from 'react-hot-toast';
import { firstLogInWithGoogleStepTwo } from '@/services/Auth';
import translation from '@/translation/translation';
import { fourDigitCodeSchema } from '@/validators/logIn';
import useSaveLogInData from '@/hooks/auth/useSaveLogInData';

const useFirstLogInWithGoogleStepTwo = (userName, email, code, password, setLoading, setError, resetForm) => {

    const { saveData } = useSaveLogInData();
    const checkCode = async () => {
        try {
            await fourDigitCodeSchema.validate({ code }, { abortEarly: true });
            return true;
        } catch (validationErrors) {
            console.log(validationErrors);
            setError(validationErrors.message);
            return false;
        }
    };
    const firstLogInWithGoogleStepTwoRequest = async () => {
        try {
            const check = await checkCode();
            if (!check) return;
            setLoading(true);
            const { data: { token, message, sessionTime } } = await firstLogInWithGoogleStepTwo({ userName, email, code, password });
            await saveData(token, sessionTime, userName);
            toast.success(message);

            resetForm();
            // goToDashboard();

        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError(translation.get('someThingIsWrong'));
            }
        } finally {
            setLoading(false);
        }
    };

    return { firstLogInWithGoogleStepTwoRequest };
};

export default useFirstLogInWithGoogleStepTwo;
