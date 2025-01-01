import { toast } from 'react-hot-toast';
import { logInPhoneStepOne } from '@/services/Auth';
import translation from '@/translation/translation';

const usePhoneLogInStepOne = (userName, setLoading, setStep, setTimer) => {


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
        toast.error(error.response.data.message);
      } else {
        toast.error(translation.get('someThingIsWrong'));
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
