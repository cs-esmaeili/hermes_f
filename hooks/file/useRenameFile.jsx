import { toast } from 'react-hot-toast';
import { renameFile } from '@/services/File';
import translation from '@/translation/translation';

const useRenameFile = (isPrivate, refreshList) => {


    const renameFileRequest = async (file_id, newName) => {
        try {
            const { data: { message } } = await renameFile({ file_id, newName, isPrivate });
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

    return { renameFileRequest };
};

export default useRenameFile;
