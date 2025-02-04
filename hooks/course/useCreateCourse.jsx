import { addCourse } from '@/services/Course';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useCreateCourse = (listener, setPersent) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const createCourseRequest = async ({ courseName, description, category_id, level, file }) => {
        try {

            let formData = new FormData();
            formData.append("courseName", courseName);
            formData.append("description", description);
            formData.append("category_id", category_id);
            formData.append("level", level);
            formData.append("file", file);

            const { data } = await addCourse(formData, setPersent);
            const { message, course_id } = data;
            toast.success(message);
            listener(course_id);
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { createCourseRequest };
};
export default useCreateCourse;
