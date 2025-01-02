import { toast } from 'react-hot-toast';
import { resetPasswordStepTwo } from '@/services/Auth';
import translation from '@/translation/translation';
import { fourDigitCodeSchema } from '@/validators/logIn';
import useSaveLogInData from '@/hooks/auth/useSaveLogInData';

const useResetPasswordStepTwo = (userName, code, password, setLoading, setError, resetForm) => {

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


    const resetPasswordStepTwoRequest = async () => {

        try {
            const check = await checkCode();
            if (!check) return;
            setLoading(true);
            const { data: { token, message, sessionTime } } = await resetPasswordStepTwo({ userName, code, password });
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

    return { resetPasswordStepTwoRequest };
};

export default useResetPasswordStepTwo;
