import { getActiveExamSession } from '@/services/examSession';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";


const useGetActiveExamSession = (Listener, onFailListener) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const getActiveExamSessionRequest = async (session_id) => {
        try {

            const { data: { examSession } } = await getActiveExamSession({ session_id });
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

    return { getActiveExamSessionRequest };
};
export default useGetActiveExamSession;
