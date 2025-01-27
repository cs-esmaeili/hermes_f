import { processApproval } from '@/services/Approval';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useProcessApproval = (refreshList) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const processApprovalRequest = async (approval_id) => {
        try {
            const { data } = await processApproval({ approval_id });
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

    return { processApprovalRequest };
};

export default useProcessApproval;
