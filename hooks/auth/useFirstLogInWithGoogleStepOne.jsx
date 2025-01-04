import { toast } from 'react-hot-toast';
import { firstLogInWithGoogleStepOne } from '@/services/Auth';
import translation from '@/translation/translation';

const useFirstLogInWithGoogleStepOne = (email, phoneNumber, setLoading, setTimer, setError) => {


    const firstLogInWithGoogleStepOneRequest = async () => {

        try {
            setLoading(true);
            const { data: { expireTime, message } } = await firstLogInWithGoogleStepOne({ email, phoneNumber });
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

    return { firstLogInWithGoogleStepOneRequest };
};

export default useFirstLogInWithGoogleStepOne;
