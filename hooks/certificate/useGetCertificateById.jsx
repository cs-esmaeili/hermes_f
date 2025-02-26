import { getCertificateById } from '@/services/Certificate';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useGetCertificateById = (Listener) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const getCertificateByIdRequest = async (id) => {
        try {
            const { data } = await getCertificateById({ id });
            Listener(data);
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { getCertificateByIdRequest };
};
export default useGetCertificateById;
