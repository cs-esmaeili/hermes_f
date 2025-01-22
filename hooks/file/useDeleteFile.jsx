import { toast } from 'react-hot-toast';
import { deleteFile } from '@/services/File';
import translation from '@/translation/translation';

const useDeleteFile = (refreshList) => {

    const deleteFileRequest = async (file_id) => {
        try {
            const { data: { message } } = await deleteFile({ file_id });
            toast.success(message);
            refreshList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(translation.get('someThingIsWrong'));
            }
        }
    };

    return { deleteFileRequest };
};

export default useDeleteFile;
