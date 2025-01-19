import DivButton from "@/components/dashboard/DivButton";
import useDeleteFile from "@/hooks/file/useDeleteFile";
import Icon from "@/components/general/Icon";
import { useEffect } from 'react';

const Delete = ({ selectedFile, refreshList }) => {

    const { deleteFileRequest } = useDeleteFile(refreshList);

    useEffect(() => {
        console.log(selectedFile);

    }, [selectedFile]);

    return (
        <DivButton className={`bg-secondary  md:!w-fit text-red-400 ${process.env.NEXT_PUBLIC_DIRECTION}`} onClick={() => {
            deleteFileRequest(selectedFile._id);
        }}>
            <Icon name={"trash"} className="w-8 h-8" />
            <span>حذف</span>
        </DivButton>
    );
};

export default Delete;