import { toast } from 'react-hot-toast';
import { getQuestions } from '@/services/question';
import translation from '@/translation/translation';

const useQuestionList = (listener, page, perPage) => {

    const questionListRequest = async () => {
        try {
            const { data: { questions, questionCount } } = await getQuestions({ page, perPage });
            if (listener) listener({ questions, questionCount });
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(translation.get('someThingIsWrong'));
            }
        }
    };

    return { questionListRequest };
};

export default useQuestionList;
