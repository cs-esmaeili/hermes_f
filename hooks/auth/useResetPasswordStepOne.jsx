import { toast } from 'react-hot-toast';
import { resetPasswordStepOne } from '@/services/Auth';
import translation from '@/translation/translation';

const useResetPasswordStepOne = (userName, setLoading, setTimer, setError) => {


    const resetPasswordStepOneRequest = async () => {

        try {
            setLoading(true);
            const { data: { expireTime, message } } = await resetPasswordStepOne({ userName });
            toast.success(message);
            setTimer(expireTime);
            setLoading(false);
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

    return { resetPasswordStepOneRequest };
};

export default useResetPasswordStepOne;
