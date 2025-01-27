import { rejectApproval } from '@/services/Approval';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useRejectApproval = (refreshList) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const rejectApprovalRequest = async (approval_id, comment) => {
        try {
            const { data } = await rejectApproval({ approval_id, comment });
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

    return { rejectApprovalRequest };
};

export default useRejectApproval;
