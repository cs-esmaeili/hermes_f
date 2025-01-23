import { updateUserData } from '@/services/User';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useUpdateUserData = (user_id, reloadUserInformation) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const updateUserDataRequest = async (newData) => {
        try {
            if (user_id) newData.user_id = user_id;
            const { data } = await updateUserData(newData);
            const { message } = data;
            toast.success(message);
            reloadUserInformation();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { updateUserDataRequest };
};
export default useUpdateUserData;
