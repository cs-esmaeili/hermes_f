import { toast } from 'react-toastify';
import { createOrLoginWithPassword } from '@/services/Auth';
import useSaveLogInData from '@/hooks/auth/useSaveLogInData';
import translation from '@/translation/translation';
import useGoDashboard from '@/hooks/auth/useGoDashboard';

const useCreateOrLoginWithPassword = () => {

  const { saveData } = useSaveLogInData();
  const { goToDashboard } = useGoDashboard();

  const passwordLogInRequest = async (userName, password, setLoading) => {

    try {
      setLoading(true);
      const { data: { token, sessionTime } } = await createOrLoginWithPassword({ userName, password });
      await saveData(token, sessionTime, userName);
      setLoading(false);
      goToDashboard();
      
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
    passwordLogInRequest,
  };
};

export default useCreateOrLoginWithPassword;
