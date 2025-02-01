import { getCourse } from '@/services/Course';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useGetCourse = (refresh) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const getCourseRequest = async (course_id) => {
        try {
            const { data } = await getCourse({ course_id });
            const { course } = data;
            refresh(course);
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { getCourseRequest };
};
export default useGetCourse;
