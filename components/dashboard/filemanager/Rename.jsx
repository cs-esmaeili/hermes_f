import { useState, useEffect, useRef } from 'react';
import CustomInput from '@/components/dashboard/CustomInput';
import DivButton from "@/components/dashboard/DivButton";
import Icon from "@/components/general/Icon";
import useRenameFolder from "@/hooks/file/useRenameFolder";
import useRenameFile from "@/hooks/file/useRenameFile";

const Rename = ({ file, path, isPrivate, refreshList }) => {

    const [activeInput, setActiveInput] = useState(false);
    const [newName, setNewName] = useState("");
    const { renameFolderRequest } = useRenameFolder(path, isPrivate, () => {
        refreshList();
        setNewName("");
        setActiveInput(false);
    });
    const { renameFileRequest } = useRenameFile(isPrivate, refreshList);

    const inputRef = useRef(null);

    useEffect(() => {
        if (activeInput && inputRef.current) {
            inputRef.current.focus();
        }
        if (file) {
            setNewName(file.hostName || file.name);
        }
    }, [activeInput]);


    return (
        <DivButton className={`bg-secondary  md:!w-fit text-teal-400 ${process.env.NEXT_PUBLIC_DIRECTION}`}
            onClick={() => setActiveInput(true)}>
            {activeInput ? (
                <CustomInput
                    placeholder={"نام جدید"}
                    containerClassName={"ltr"}
                    inputClassName={"ltr placeholder:text-center"}
                    onBlur={() => setActiveInput(false)}
                    value={newName}
                    onChange={(e) => { setNewName(e.target.value) }}
                    ref={inputRef}
                    onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            if (file.type == "file") {
                                renameFileRequest(file._id, newName);
                            } else if (file.type == "folder") {
                                renameFolderRequest(file.name, newName);
                            }
                        }
                    }}
                />
            ) : (
                <>
                    <Icon name={"edit"} className="w-8 h-8" />
                    <span>تغییر نام</span>
                </>
            )}
        </DivButton>
    );
};

export default Rename;
