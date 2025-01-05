import { togglePermission } from '@/services/Permission';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useTogglePermission = (setUpdateList) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const togglePermissionRequest = async (role_id, permission_id) => {

        try {
            const { data } = await togglePermission({ role_id, permission_id });
            const { message } = data;
            toast.success(message);
            setUpdateList();
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || someThingIsWrong);
        }
    };

    return { togglePermissionRequest };
};
export default useTogglePermission;
