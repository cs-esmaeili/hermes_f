import { courseList } from '@/services/Course';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useCourseList = (Listener) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const courseListRequest = async (page, perPage) => {
        try {
            const { data } = await courseList({ page, perPage });
            const { courses, courseCount } = data;
            Listener(courses, courseCount);
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { courseListRequest };
};
export default useCourseList;
