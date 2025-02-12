import { adminGetTickets } from '@/services/Ticket';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useAdminTicketList = (listener) => {
    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong']);

    const getAdminTicketsRequest = async ({ page, perPage }) => {
        try {
            const { data } = await adminGetTickets({ page, perPage });
            listener(data);
        } catch (error) {
            console.error(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { getAdminTicketsRequest };
};

export default useAdminTicketList;
