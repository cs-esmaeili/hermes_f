import { deleteTopic } from '@/services/Course';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useDeleteTopic = (listener) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const deleteTopicRequest = async (course_id, file_id) => {
        try {
            const { data } = await deleteTopic({ course_id, file_id });
            const { message } = data;
            toast.success(message);
            listener();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { deleteTopicRequest };
};
export default useDeleteTopic;
