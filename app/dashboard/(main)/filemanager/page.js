'use client'

import CustomInput from "@/components/dashboard/CustomInput";
import Path from "@/components/dashboard/filemanager/Path";
import DivButton from "@/components/dashboard/DivButton";
import Icon from "@/components/general/Icon";
import { useState, useEffect } from 'react';
import List from "@/components/dashboard/filemanager/List";
import FolderCreate from "@/components/dashboard/filemanager/FolderCreate";

export default function FileManager() {

    const [path, setPath] = useState([""]);
    const [updateList, setUpdateList] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);

    const refreshList = async () => setUpdateList(!updateList);

    return (
        <div className='flex flex-col grow max-w-full gap-3  overflow-y-auto'>
            <div className="flex flex-col bg-primary rounded-md gap-3 p-3">

                <Path path={path} setPath={setPath} />

                <div className="flex flex-col md:flex-row gap-3">

                    <FolderCreate path={path} refreshList={refreshList} />

                    <DivButton className={`bg-secondary  md:!w-fit text-teal-400 ${process.env.NEXT_PUBLIC_DIRECTION}`}>
                        <Icon name={"edit"} className="w-8 h-8" />
                        <span>تغییر نام</span>
                    </DivButton>
                    <DivButton className={`bg-secondary  md:!w-fit text-red-400 ${process.env.NEXT_PUBLIC_DIRECTION}`}>
                        <Icon name={"trash"} className="w-8 h-8" />
                        <span>حذف</span>
                    </DivButton>
                    <DivButton className={`bg-secondary  md:!w-fit text-blue-400 ${process.env.NEXT_PUBLIC_DIRECTION}`}>
                        <Icon name={"uploadfile"} className="w-8 h-8" />
                        <span>آپلود</span>
                    </DivButton>


                    <DivButton className={`bg-secondary  md:!w-fit ${isPrivate && "!bg-purple-500 text-white"} ${process.env.NEXT_PUBLIC_DIRECTION}`}
                        onClick={() => {
                            setIsPrivate(!isPrivate);
                            setPath("");
                        }}>
                        <Icon name={"lock"} className="w-8 h-8" />
                        <span>مسیر ایمن</span>
                    </DivButton>

                </div>
            </div>

            <List folderPath={path} updateList={updateList} isPrivate={isPrivate} />
        </div>
    )
}
