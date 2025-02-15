import { createPost } from '@/services/Post';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useCreatePost = (listener) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const createPostRequest = async (userData) => {
        try {
            const { data } = await createPost(userData);
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

    return { createPostRequest };
};
export default useCreatePost;
