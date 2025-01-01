import { toast } from 'react-hot-toast';
import { logInPhoneStepTwo } from '@/services/Auth';
import translation from '@/translation/translation';
import useGoDashboard from '@/hooks/auth/useGoDashboard';
import useSaveLogInData from '@/hooks/auth/useSaveLogInData';

const usePhoneLogInStepTwo = (userName, code, setLoading, setStep , setTimer) => {


  const { saveData } = useSaveLogInData();
  const { goToDashboard } = useGoDashboard();
  const phoneStepTwoLogInRequest = async () => {

    try {
      setLoading(true);
      const { data: { token, message, sessionTime } } = await logInPhoneStepTwo({ userName, code });
      await saveData(token, sessionTime, userName);
      toast.success(message);
      setLoading(false);
      setStep(true);
      setTimer(0);
      // goToDashboard();

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
    phoneStepTwoLogInRequest,
  };
};

export default usePhoneLogInStepTwo;
