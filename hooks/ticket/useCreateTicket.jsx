import { createTicket } from '@/services/Ticket';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useCreateTicket = (listener) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const createTicketRequest = async ({ subject, comment, priority }) => {
        try {
            const { data } = await createTicket({ subject, comment, priority });
            const { message } = data;
            toast.success(message);
            listener();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { createTicketRequest };
};
export default useCreateTicket;
