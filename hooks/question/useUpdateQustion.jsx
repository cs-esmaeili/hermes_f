import { updateQuestion } from '@/services/question';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useUpdateQustion = (listener) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const updateQustionRequest = async ({ question_id, question, options, correctOption }) => {
        try {
            const { data: { message } } = await updateQuestion({ question_id, question, options, correctOption });
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

    return { updateQustionRequest };
};
export default useUpdateQustion;
