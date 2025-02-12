import { adminUpdateTicket } from '@/services/Ticket';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useAdminUpdateTicket = (listener) => {
    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong']);

    const updateAdminTicketRequest = async ({ ticket_id, comment, status }) => {
        try {
            const { data: { message } } = await adminUpdateTicket({ ticket_id, comment, status });
            toast.success(message);
            listener();
        } catch (error) {
            console.error(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { updateAdminTicketRequest };
};

export default useAdminUpdateTicket;
