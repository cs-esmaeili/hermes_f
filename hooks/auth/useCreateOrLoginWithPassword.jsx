import { toast } from 'react-hot-toast';
import { createOrLoginWithPassword } from '@/services/Auth';
import useSaveLogInData from '@/hooks/auth/useSaveLogInData';
import translation from '@/translation/translation';
import useGoDashboard from '@/hooks/auth/useGoDashboard';

const useCreateOrLoginWithPassword = (userName, password, setLoading, setError) => {

  const { saveData } = useSaveLogInData();
  const { goToDashboard } = useGoDashboard();

  const passwordLogInRequest = async () => {

    try {
      setLoading(true);
      const { data: { token, sessionTime, message } } = await createOrLoginWithPassword({ userName, password });
      await saveData(token, sessionTime, userName);
      toast.success(message);
      setLoading(false);
      //  goToDashboard();

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
    passwordLogInRequest,
  };
};

export default useCreateOrLoginWithPassword;
