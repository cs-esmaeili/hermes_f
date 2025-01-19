import { toast } from 'react-hot-toast';
import { renameFolder } from '@/services/File';
import translation from '@/translation/translation';

const useRenameFolder = (path, isPrivate, refreshList) => {


    const renameFolderRequest = async (oldFolderName, newFolderName) => {
        try {
            const oldFolderPath = [...path , oldFolderName];
            const newFolderPath = [...path , newFolderName];
            const { data: { message } } = await renameFolder({ oldFolderPath, newFolderPath, isPrivate });
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

    return { renameFolderRequest };
};

export default useRenameFolder;
