import { toast } from 'react-hot-toast';
import { logInPhoneStepTwo } from '@/services/Auth';
import translation from '@/translation/translation';
import useGoDashboard from '@/hooks/auth/useGoDashboard';
import useSaveLogInData from '@/hooks/auth/useSaveLogInData';
import { fourDigitCodeSchema } from '@/validators/logIn';

const usePhoneLogInStepTwo = (userName, code, setLoading, setStep, setTimer, setError) => {


  const { saveData } = useSaveLogInData();
  const { goToDashboard } = useGoDashboard();

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


  const phoneStepTwoLogInRequest = async () => {

    try {
      const check = await checkCode();
      if (!check) return;
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
        setError(error.response.data.message);
      } else {
        setError(translation.get('someThingIsWrong'));
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
