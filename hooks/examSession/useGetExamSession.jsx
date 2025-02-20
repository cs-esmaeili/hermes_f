import { getExamSession } from '@/services/examSession';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";


const useGetExamSession = (Listener, onFailListener) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const getExamSessionRequest = async (session_id) => {
        try {

            const { data: { examSession } } = await getExamSession({ session_id });
            Listener(examSession);
        } catch (error) {
            if (onFailListener) onFailListener();
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { getExamSessionRequest };
};
export default useGetExamSession;
