import { createCertificate } from '@/services/Certificate';
import { toast } from 'react-hot-toast';
import translation from "@/translation/translation";

const useCreateCertificate = (listener, setPersent) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong', 'permissions']);

    const createCertificateRequest = async ({
        fullName, nationalCode,
        birthday, fatherName, companyName, economicCode, registrationNumber, postalCode
        , ostan, shahr, address, file, name, cert_template_id, title, startDate, endDate
    }) => {
        try {
            let formData = new FormData();
            formData.append("name", name);
            formData.append("fullName", fullName);
            formData.append("nationalCode", nationalCode);
            formData.append("birthday", birthday);
            formData.append("fatherName", fatherName);
            formData.append("companyName", companyName);
            formData.append("economicCode", economicCode);
            formData.append("registrationNumber", registrationNumber);
            formData.append("postalCode", postalCode);
            formData.append("ostan", ostan);
            formData.append("shahr", shahr);
            formData.append("address", address);
            formData.append("file", file);
            formData.append("cert_template_id", cert_template_id);
            formData.append("title", title);
            formData.append("startDate", startDate);
            formData.append("endDate", endDate);

            const { data } = await createCertificate(formData, setPersent);
            const { message } = data;
            toast.success(message);
            listener();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    };

    return { createCertificateRequest };
};
export default useCreateCertificate;
