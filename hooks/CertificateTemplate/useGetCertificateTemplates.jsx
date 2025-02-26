import { getCertificateTemplates } from '@/services/CertificateTemplate';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useGetCertificateTemplates = (Listener) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const getCertificateTemplatesRequest = async () => {
        try {
            const { data } = await getCertificateTemplates();
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

    return { getCertificateTemplatesRequest };
};
export default useGetCertificateTemplates;
