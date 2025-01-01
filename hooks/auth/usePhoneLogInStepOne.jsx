import { toast } from 'react-hot-toast';
import { logInPhoneStepOne } from '@/services/Auth';
import translation from '@/translation/translation';

const usePhoneLogInStepOne = (userName, setLoading, setStep, setTimer, setError) => {


  const phoneStepOneLogInRequest = async () => {

    try {
      setLoading(true);
      const { data: { expireTime, message } } = await logInPhoneStepOne({ userName });
      toast.success(message);
      setTimer(expireTime);
      setLoading(false);
      setStep(false);
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

  return {
    phoneStepOneLogInRequest,
  };
};

export default usePhoneLogInStepOne;
