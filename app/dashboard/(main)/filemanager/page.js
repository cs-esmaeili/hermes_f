'use client'

import { useState, useEffect } from 'react';
import Path from "@/components/dashboard/filemanager/Path";
import DivButton from "@/components/dashboard/DivButton";
import Icon from "@/components/general/Icon";
import List from "@/components/dashboard/filemanager/List";
import FolderCreate from "@/components/dashboard/filemanager/FolderCreate";
import Upload from "@/components/dashboard/filemanager/Upload";
import Delete from "@/components/dashboard/filemanager/Delete";
import Rename from '@/components/dashboard/filemanager/Rename';


export default function FileManager({ listener }) {

    const [path, setPath] = useState([""]);
    const [updateList, setUpdateList] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);


    const refreshList = async () => setUpdateList(!updateList);



    useEffect(() => {
        if (listener)
            listener(selectedFile)
    }, [selectedFile]);

    return (
        <div className='flex flex-col grow max-w-full gap-3  overflow-y-auto'>
            <div className="flex flex-col bg-primary rounded-md gap-3 p-3">

                <Path path={path} setPath={setPath} refreshList={refreshList} />

                <div className="flex flex-col  flex-wrap md:flex-row gap-3">

                    <FolderCreate path={path} refreshList={refreshList} isPrivate={isPrivate} />

                    <Rename file={selectedFile} path={path} isPrivate={isPrivate} refreshList={refreshList} />

                    <Delete isPrivate={isPrivate} refreshList={refreshList} selectedFile={selectedFile} />
                    <Upload folderPath={path} isPrivate={isPrivate} refreshList={refreshList} />
                    <DivButton className={`bg-secondary  md:!w-fit ${isPrivate && "!bg-purple-500 text-white"} ${process.env.NEXT_PUBLIC_DIRECTION}`}
                        onClick={() => {
                            setIsPrivate(!isPrivate);
                            setPath([""]);
                            refreshList();
                        }}>
                        <Icon name={"lock"} className="w-8 h-8" />
                        <span>مسیر ایمن</span>
                    </DivButton>

                </div>
            </div>
            <List setPath={setPath} folderPath={path} updateList={updateList} isPrivate={isPrivate} refreshList={refreshList}
                setSelectedFile={setSelectedFile} selectedFile={selectedFile} />
        </div>
    )
}
