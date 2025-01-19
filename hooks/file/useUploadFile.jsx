import { toast } from 'react-hot-toast';
import { uploadFile } from '@/services/File';
import translation from '@/translation/translation';

const useUploadFile = (folderPath, isPrivate, setPersent, refreshList) => {

    const uploadFileRequest = async (file) => {
        try {
            setPersent(0);

            let formData = new FormData();
            formData.append("folderPath", JSON.stringify(folderPath));
            formData.append("isPrivate", JSON.stringify(isPrivate));
            formData.append("file", file);

            const { data: { message } } = await uploadFile(formData, (persent) => {
                setPersent(persent);
            });
            toast.success(message);
            setPersent(0);
            refreshList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(translation.get('someThingIsWrong'));
            }
            setPersent(0);
        }
    };

    return { uploadFileRequest };
};

export default useUploadFile;
