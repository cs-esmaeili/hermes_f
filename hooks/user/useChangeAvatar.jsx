import { changeAvatar } from '@/services/User';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useChangeAvatar = (user_id, reloadUserData) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const changeAvatarRequest = async (file) => {
        try {
            let formData = new FormData();
            formData.append("file", file);
            if (user_id) formData.append("user_id", user_id);
            const { data } = await changeAvatar(formData, () => { });
            const { message } = data;
            toast.success(message);
            reloadUserData();
        } catch (error) {
            console.error(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { changeAvatarRequest };
};

export default useChangeAvatar;
