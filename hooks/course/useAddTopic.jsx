import { addTopic } from '@/services/Course';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useAddTopic = (listener, setPersent) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const addTopicRequest = async ({ course_id, title, order, isPrivate, file }) => {
        try {
            let formData = new FormData();
            formData.append("course_id", course_id);
            formData.append("title", title);
            formData.append("order", order);
            formData.append("isPrivate", isPrivate);
            formData.append("file", file);

            const { data } = await addTopic(formData, setPersent);
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

    return { addTopicRequest };
};
export default useAddTopic;
