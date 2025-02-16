import { updatePost } from '@/services/Post';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useUpdatePost = (listener) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const updatePostRequest = async (userData, post_id) => {
        try {
            const { data } = await updatePost({ ...userData, post_id });
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

    return { updatePostRequest };
};
export default useUpdatePost;
