import { toast } from 'react-hot-toast';
import { createFolder } from '@/services/File';
import translation from '@/translation/translation';

const useCreateFolder = (folderPath, isPrivate, refreshList) => {


    const CreateFolderRequest = async (folderName) => {

        try {
            const { data: { message } } = await createFolder({ folderName, folderPath, isPrivate });
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

    return { CreateFolderRequest };
};

export default useCreateFolder;
