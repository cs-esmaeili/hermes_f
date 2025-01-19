import { listFiles } from '@/services/File';
import translation from '@/translation/translation';
import toast from 'react-hot-toast';

const useFileList = (folderPath, isPrivate, setList, setLoading) => {

    const FileListRequest = async () => {
        try {
            setLoading(true);
            const { data: { files } } = await listFiles({ folderPath, isPrivate });
            setList(files);
            setLoading(false);
        } catch (error) {
            console.log(error);
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(translation.get('someThingIsWrong'));
            }
        }
    };

    return { FileListRequest };
};

export default useFileList;
