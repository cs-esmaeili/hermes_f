import { addCourse } from '@/services/Course';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useCreateCourse = (refresh, setPersent) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const createCourseRequest = async ({ courseName, description, category_id, level, file }) => {
        try {

            let formData = new FormData();
            formData.append("courseName", JSON.stringify(courseName));
            formData.append("description", JSON.stringify(description));
            formData.append("category_id", JSON.stringify(category_id));
            formData.append("level", JSON.stringify(level));
            formData.append("file", file);


            const { data } = await addCourse(formData, (persent) => {
                setPersent(persent);
            });

            const { message } = data;
            toast.success(message);
            refresh();
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
