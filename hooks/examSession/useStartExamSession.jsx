import { startExam } from '@/services/examSession';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useStartExamSession = (listener) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const startExamSessionRequest = async (exam_id) => {
        try {
            const { data } = await startExam({ exam_id });
            const { message } = data;
            toast.success(message);
            if (listener) listener();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { startExamSessionRequest };
};
export default useStartExamSession;
