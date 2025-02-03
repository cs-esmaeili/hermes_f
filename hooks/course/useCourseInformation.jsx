import { courseInformation } from '@/services/Course';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";


const useCourseInformation = (setSelectedCourse) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const userInformationRequest = async (course_id) => {
        try {
            console.log("userInformationRequest");

            const { data } = await courseInformation({ course_id });
            const { course } = data;
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

    return { userInformationRequest };
};
export default useCourseInformation;
