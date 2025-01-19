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
                setError(error.response.data.message);
            } else {
                setError(translation.get('someThingIsWrong'));
            }
            setPersent(0);
        }
    };

    return { deleteFileRequest };
};

export default useDeleteFile;
