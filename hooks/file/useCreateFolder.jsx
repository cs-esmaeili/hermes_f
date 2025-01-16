import { toast } from 'react-hot-toast';
import { createFolder } from '@/services/File';
import translation from '@/translation/translation';

const useCreateFolder = (folderPath, isPrivate, refreshList) => {


    const CreateFolderRequest = async () => {

        try {
            const { data: { message } } = await createFolder({ folderPath, isPrivate });
            toast.success(message);
            refreshList();
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError(translation.get('someThingIsWrong'));
            }
        }
    };

    return { CreateFolderRequest };
};

export default useCreateFolder;
