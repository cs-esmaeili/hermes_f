import { updateTicket } from '@/services/Ticket';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useUpdateTicket = (listener) => {
    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong']);

    const updateTicketRequest = async ({ ticket_id, comment }) => {
        try {
            const { data: { message } } = await updateTicket({ ticket_id, comment });
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

    return { updateTicketRequest };
};

export default useUpdateTicket;
