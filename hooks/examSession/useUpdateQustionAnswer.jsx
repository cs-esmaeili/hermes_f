import { updateQustionAnswer } from '@/services/examSession';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useUpdateQustionAnswer = (listener) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const updateQustionAnswerRequest = async ({ sessionId, questionIndex, answer }) => {
        try {
            const { data: { message } } = await updateQustionAnswer({ sessionId, questionIndex, answer });
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

    return { updateQustionAnswerRequest };
};
export default useUpdateQustionAnswer;
