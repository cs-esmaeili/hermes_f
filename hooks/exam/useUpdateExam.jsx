import { updateExam } from '@/services/exam';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useUpdateExam = (listener) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const updateExamRequest = async ({ exam_id, title, duration, questionCount, minScore, timeGate, certificate }) => {
        try {
            const { data: { message } } = await updateExam({ exam_id, title, duration, questionCount, minScore, timeGate, certificate });
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

    return { updateExamRequest };
};
export default useUpdateExam;
