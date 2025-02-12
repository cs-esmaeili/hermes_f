import { adminGetTicketById } from '@/services/Ticket';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useAdminGetTicketById = (listener) => {
    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong']);

    const getAdminTicketByIdRequest = async (ticket_id) => {
        try {
            const { data } = await adminGetTicketById({ ticket_id });
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

    return { getAdminTicketByIdRequest };
};

export default useAdminGetTicketById;
