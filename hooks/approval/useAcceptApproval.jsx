import { acceptApproval } from '@/services/Approval';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useAcceptApproval = (refreshList) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const acceptApprovalRequest = async (approval_id) => {
        try {
            const { data } = await acceptApproval({ approval_id });
            const { message } = data;
            toast.success(message);
            refreshList();
        } catch (error) {
            console.error(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { acceptApprovalRequest };
};

export default useAcceptApproval;
