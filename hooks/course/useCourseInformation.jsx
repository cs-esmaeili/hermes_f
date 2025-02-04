import { courseInformation } from '@/services/Course';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";


const useCourseInformation = (setSelectedCourse) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const courseInformationRequest = async (course_id) => {
        try {

            const { data: { course } } = await courseInformation({ course_id });
            setSelectedCourse(course);
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { courseInformationRequest };
};
export default useCourseInformation;
