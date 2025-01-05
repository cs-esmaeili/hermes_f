import { roleList } from '@/services/Role';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useRoleList = (setRoles, setAllpermissions, setCurrentRole, selectMode, currentIndex) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const roleListRequest = async (selectLastActiveRole) => {
        try {
            const { data } = await roleList();
            setRoles(data.roles);
            if (!selectMode) {
                setAllpermissions(data.permissions);
                if (currentIndex != -1 && selectLastActiveRole) {
                    setCurrentRole(data.roles[currentIndex]);
                }
            }
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { roleListRequest };
};
export default useRoleList;
