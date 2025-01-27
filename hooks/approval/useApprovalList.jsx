import { approvalList } from '@/services/Approval';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useApprovalList = (page, perPage, setApprovals, setApprovalsCount) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const approvalListRequest = async () => {
        try {
            const { data } = await approvalList({ page, perPage });
            const { approvalsCount, approvals } = data;
            setApprovals(approvals);
            setApprovalsCount(approvalsCount);
        } catch (error) {
            console.error(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { approvalListRequest };
};

export default useApprovalList;
