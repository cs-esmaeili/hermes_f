import { userInformation } from '@/services/User';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";
import { useDispatch } from 'react-redux';
import { setPermissions } from '@/state/permissions';
import { setinformation } from '@/state/information';


const useUserInformation = (user_id, setSelectedUser) => {
    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);
    const dispatch = useDispatch();

    const userInformationRequest = async () => {
        try {

            const { data } = await userInformation({ user_id });
            const { permissions, information } = data;

            if (user_id) {
                setSelectedUser(information);
                return;
            }

            dispatch(setPermissions(permissions));
            dispatch(setinformation(information));
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { userInformationRequest };
};
export default useUserInformation;
