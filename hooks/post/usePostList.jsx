import { postList } from '@/services/Post';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const usePostList = (Listener) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const postListRequest = async (page, perPage) => {
        try {
            const { data } = await postList({ page, perPage });
            const { posts, postsCount } = data;
            Listener(posts, postsCount);
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { postListRequest };
};
export default usePostList;
