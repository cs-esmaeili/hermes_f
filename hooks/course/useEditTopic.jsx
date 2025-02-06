import { editTopic } from '@/services/Course';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useEditTopic = (listener) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const editTopicRequest = async (course_id, file_id, title, order, changeVisibility) => {
        try {
            // console.log({ course_id, file_id, title, order, changeVisibility });
            
            const { data } = await editTopic({ course_id, file_id, title, order, changeVisibility });
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

    return { editTopicRequest };
};
export default useEditTopic;
