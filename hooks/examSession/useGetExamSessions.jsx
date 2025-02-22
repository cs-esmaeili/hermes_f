import { toast } from 'react-hot-toast';
import { getExamSessions } from '@/services/examSession';
import translation from '@/translation/translation';

const useGetExamSessions = (Listener, page, perPage) => {

    const getExamSessionsRequest = async () => {
        try {
            const { data: { examSessionCount, examSessions } } = await getExamSessions({ page, perPage });
            Listener({ examSessionCount, examSessions });
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(translation.get('someThingIsWrong'));
            }
        }
    };

    return { getExamSessionsRequest };
};

export default useGetExamSessions;
