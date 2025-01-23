import { createUser } from '@/services/User';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useCreateUser = (reloadUserInformation) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const createUserRequest = async (userData) => {
        try {
            const { data } = await createUser(userData);
            const { message } = data;
            toast.success(message);
            if (reloadUserInformation) reloadUserInformation();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { createUserRequest };
};
export default useCreateUser;
