import { getTickets } from '@/services/Ticket';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useGetTickets = (listener) => {
    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong']);

    const getTicketsRequest = async ({ page, perPage }) => {
        try {
            const { data } = await getTickets({ page, perPage });
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

    return { getTicketsRequest };
};

export default useGetTickets;
