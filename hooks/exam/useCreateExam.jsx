import { toast } from 'react-hot-toast';
import { createExam } from '@/services/exam'; 
import translation from '@/translation/translation';

const useCreateExam = (refreshList) => {
    
    const CreateExamRequest = async (examData) => {
        try {
            const { data: { message } } = await createExam(examData);
            toast.success(message);
            refreshList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(translation.get('someThingIsWrong'));
            }
        }
    };

    return { CreateExamRequest };
};

export default useCreateExam;
