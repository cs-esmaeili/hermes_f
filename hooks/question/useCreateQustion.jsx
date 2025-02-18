import { toast } from 'react-hot-toast';
import { createQuestion } from '@/services/question';
import translation from '@/translation/translation';

const useCreateQustion = (refreshList) => {

    const CreateQustionRequest = async (examData) => {
        try {
            const { data: { message } } = await createQuestion(examData);
            toast.success(message);
            if (refreshList) refreshList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(translation.get('someThingIsWrong'));
            }
        }
    };

    return { CreateQustionRequest };
};

export default useCreateQustion;
