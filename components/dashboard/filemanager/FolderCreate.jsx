import { useState, useEffect, useRef } from 'react';
import CustomInput from '@/components/dashboard/CustomInput';
import DivButton from "@/components/dashboard/DivButton";
import Icon from "@/components/general/Icon";
import useCreateFolder from "@/hooks/file/useCreateFolder";

const FolderCreate = ({ refreshList, path, isPrivate }) => {

    const [activeInput, setActiveInput] = useState(false);
    const { CreateFolderRequest } = useCreateFolder(path, isPrivate, refreshList);
    const inputRef = useRef(null);

    useEffect(() => {
        if (activeInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [activeInput]);

    return (
        <DivButton
            className={`bg-secondary md:!w-fit text-yellow-400 ${process.env.NEXT_PUBLIC_DIRECTION}`}
            onClick={() => setActiveInput(true)}
        >
            {activeInput ? (
                <CustomInput
                    placeholder={"نام پوشه"}
                    containerClassName={"ltr"}
                    inputClassName={"ltr placeholder:text-center"}
                    onBlur={() => setActiveInput(false)}
                    ref={inputRef}
                    onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            CreateFolderRequest(e.target.value);
                            inputRef.current.value = "";
                        }
                    }}
                />
            ) : (
                <>
                    <Icon name={"addfolder"} className="w-8 h-8" />
                    <span>ساخت پوشه</span>
                </>
            )}
        </DivButton>
    );
};

export default FolderCreate;
