import { editCourse } from '@/services/Course';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useEditCourse = (refresh, setPersent) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const editCourseRequest = async ({ _id, courseName, description, category_id, level, file }) => {
        try {

            let formData = new FormData();
            formData.append("course_id", _id);
            formData.append("courseName", courseName);
            formData.append("description", description);
            formData.append("category_id", category_id);
            formData.append("level", level);
            formData.append("file", file);

            const { data } = await editCourse(formData, setPersent);
            const { message, course_id } = data;
            toast.success(message);
            refresh(course_id);
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { editCourseRequest };
};
export default useEditCourse;
