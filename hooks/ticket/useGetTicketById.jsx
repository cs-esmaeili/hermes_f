import { getTicketById } from '@/services/Ticket';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useGetTicketById = (listener) => {
    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong']);

    const getTicketByIdRequest = async (ticket_id) => {
        try {
            const { data } = await getTicketById({ ticket_id });
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

    return { getTicketByIdRequest };
};

export default useGetTicketById;
