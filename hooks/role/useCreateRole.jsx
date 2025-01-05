import { createRole } from '@/services/Role';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useCreateRole = (roleList) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const createRoleRequest = async (name) => {
        try {
            const { data } = await createRole({ name });
            const { message } = data;
            toast.success(message);
            roleList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { createRoleRequest };
};
export default useCreateRole;
