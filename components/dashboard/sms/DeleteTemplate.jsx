import { MdDelete } from "react-icons/md";
import { deleteSmsTemplate as RdeleteSmsTemplate } from '@/services/smsTemplate';
import toast from 'react-hot-toast';
import translation from "@/translation/translation";

const DeleteTemplate = ({ _id, updateList }) => {

    const { someThingIsWrong } = translation.getMultiple(['someThingIsWrong']);
    
    const smsTemplateList = async () => {
        try {
            const { data } = await RdeleteSmsTemplate({ _id });
            const { message } = data;
            toast.success(message);
            updateList();
        } catch (error) {
            console.log(error);
            
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(someThingIsWrong);
            }
        }
    }

    return (
        <MdDelete className='text-2xl text-red-400 hover:bg-primary' onClick={() => {
            smsTemplateList();
        }} />
    );
};

export default DeleteTemplate;