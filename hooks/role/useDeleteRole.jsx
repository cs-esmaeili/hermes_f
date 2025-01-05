import { deleteRole } from '@/services/Role';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useDeleteRole = (resetAllData, roleListRequest) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const deleteRoleRequest = async (role_id, newRole_id) => {
        try {
            const { data } = await deleteRole({ role_id, newRole_id });
            const { message } = data;
            toast.success(message);
            resetAllData();
            roleListRequest();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { deleteRoleRequest };
};
export default useDeleteRole;
