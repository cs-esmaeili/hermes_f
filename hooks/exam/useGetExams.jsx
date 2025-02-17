import { toast } from 'react-hot-toast';
import { getExams } from '@/services/exam';
import translation from '@/translation/translation';

const useGetExams = (Listener, page, perPage) => {

    const getExamsRequest = async () => {
        try {
            const { data: { examCount, exams } } = await getExams({ page, perPage });
            Listener({ examCount, exams });
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(translation.get('someThingIsWrong'));
            }
        }
    };

    return { getExamsRequest };
};

export default useGetExams;
