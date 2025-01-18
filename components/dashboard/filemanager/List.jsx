'use client'

import { useState, useEffect } from 'react';
import useFileList from '@/hooks/file/useFileList';
import Icon from "@/components/general/Icon";
import { getCookie } from 'cookies-next';
import Tooltip from '@/components/general/ToolTip';
import { useModalContext } from '@/components/dashboard/Modal';
import FileDetails from './FileDetails';

export default function List({ folderPath, setPath, isPrivate, updateList, refreshList }) {

  const [List, setList] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { FileListRequest } = useFileList(folderPath, isPrivate, setList);
  const token = decodeURIComponent(getCookie('token'));
  const { openModal, closeModal } = useModalContext();

  useEffect(() => {
    FileListRequest();
  }, [updateList]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {List &&
        List.map((file, index) => (
          <div
            key={index}
            className={`relative bg-primary rounded-lg p-3 hover:shadow-md transition-shadow select-none cursor-pointer  border-2 border-transparent ${selectedIndex == index  && "!border-blue-200"}`}
            role='button'
            onDoubleClick={() => {
              if (file.type === "folder") {
                setPath([...folderPath, file.name]);
                refreshList();
              } else {
                openModal(<FileDetails file={file} />);
              }
            }}
            onClick={() => {
              setSelectedIndex(index);
            }}>
            {file.type === "folder" && (
              <div className='w-full'>
                <Icon
                  name={"addfolder"}
                  className="w-full h-3/4 text-yellow-400"
                />
              </div>
            )}

            {file.type === "file" && file.mimeType.includes("image") && (
              <div className='w-full h-full' role='button'>
                <img src={`${process.env.NEXT_PUBLIC_API}file/${file._id}/${token}`} className="w-full h-full object-cover rounded-lg" />
              </div>
            )}

            {file.type === "file" && file.mimeType.includes("video") && (
              <div className='w-full h-full' role='button'>
                <Icon name={"video"} className="w-full h-3/4 text-red-400" />
              </div>
            )}
            {file.type === "file" && typeof file.mimeType === "string" && !file.mimeType.includes("video") && !file.mimeType.includes("image") && (
              <div className='w-full h-full' role='button'>
                <Icon
                  name={"file"}
                  className="w-full h-3/4 text-white"
                />
              </div>
            )}

            <Tooltip content={file.hostName || file.name}>
              <div className='absolute truncate ... bottom-0 inset-x-0 bg-primary bg-opacity-50 w-full text-center'>
                {file.hostName}
                {file.name}
              </div>
            </Tooltip>
          </div>
        ))}
    </div>

  );
};