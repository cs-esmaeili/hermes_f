import { startExam } from '@/services/examSession';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setGlobalMessage } from '@/state/globalMessage';

const useStartExamSession = (listener) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);
    const { replace } = useRouter();
    const dispatch = useDispatch();

    const startExamSessionRequest = async (exam_id) => {
        try {
            const { data } = await startExam({ exam_id });
            const { message, examSession } = data;
            toast.success(message);
            if (listener) listener(examSession);
        } catch (error) {
            if (error?.response?.data?.goToProfile) {

                dispatch(setGlobalMessage({ message: "برای شرکت در آزمون باید اطلاعات پروفایل خود را تکمیل کنید", openSection: "certificate" }));
                replace("/dashboard/profile")
            } else if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { startExamSessionRequest };
};
export default useStartExamSession;
