import { createUser } from '@/services/User';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useCreateUser = (resetForm) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const createUserRequest = async (userData) => {
        try {
            const { data } = await createUser(userData);
            const { message } = data;
            toast.success(message);
            if (resetForm) resetForm();
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
