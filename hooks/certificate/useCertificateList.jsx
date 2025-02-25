import { getAllCertificates } from '@/services/Certificate';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useCertificateList = (Listener) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const certificateListRequest = async (page, perPage) => {
        try {
            const { data } = await getAllCertificates({ page, perPage });
            const { certificates, certificateCount } = data;
            Listener(certificates, certificateCount);
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { certificateListRequest };
};
export default useCertificateList;
