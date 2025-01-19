import DivButton from "@/components/dashboard/DivButton";
import Icon from "@/components/general/Icon";
import ProgressBar from '@/components/dashboard/ProgressBar';
import useUploadFile from '@/hooks/file/useUploadFile';
import { useRef, useState } from 'react';

const Upload = ({ folderPath, isPrivate, refreshList }) => {

    const fileInputRef = useRef(null);
    const [persent, setPersent] = useState(0);
    const { uploadFileRequest } = useUploadFile(folderPath, isPrivate, setPersent, refreshList);

    return (
        <DivButton className={`bg-secondary  md:!w-fit text-blue-400 ${process.env.NEXT_PUBLIC_DIRECTION}`} onClick={() => {
            fileInputRef.current.click();
        }}>
            <Icon name={"uploadfile"} className="w-8 h-8 min-w-8 min-h-8" />
            <span>آپلود</span>
            <input
                id="file"
                type="file"
                accept="image/*, video/*"
                aria-describedby="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => uploadFileRequest(e.target.files[0])}
            />
            <div className={`w-full min-w-32 ${persent == 0 && "hidden"}`}>
                <ProgressBar progress={persent} />
            </div>
        </DivButton>
    );
};

export default Upload;