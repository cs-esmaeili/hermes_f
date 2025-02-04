import Icon from '@/components/general/Icon';
import CustomInput from '../CustomInput';
import { useState, useEffect, useRef } from 'react';
import useAddTopic from '@/hooks/course/useAddTopic';
import PickFile from '@/components/dashboard/PickFile';

const AddTopic = ({ course_id, refreshList }) => {

    const [isPrivate, setIsPrivate] = useState(true);
    const [title, setTitle] = useState("");
    const [persent, setPersent] = useState(0);
    // const [file, setFile] = useState(null);
    const pickFileRef = useRef(null);
    const { addTopicRequest } = useAddTopic(() => { refreshList() }, (persent) => setPersent(persent));

    return (
        <div className={`bg-primary mt-3 ${process.env.NEXT_PUBLIC_DIRECTION}`}>
            <div className='flex  grow h-fit justify-between rounded-md p-3  border-2 border-dashed border-blue-400 cursor-pointer select-none'>
                <div className='relative flex items-center justify-center gap-2 pr-3'>
                    <span className="absolute right-[-27px] w-[29px] h-[29px] bg-primary border-2  border-gray-400 border-opacity-50 text-[16px] font-bold flex items-center  justify-center rounded-full leading-none ">
                        5
                    </span>
                    <CustomInput placeholder="عنوان سرفصل" containerClassName="border-2 border-accent rounded-md border-opacity-50"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <div className="w-px h-full bg-gray-400"></div>
                    <div className='flex justify-end items-center gap-2' onClick={() => {
                        setIsPrivate(!isPrivate);
                    }}>
                        {isPrivate ?
                            <>
                                <Icon name={"lock"} className="w-8 h-8 text-purple-400" />
                                <div>فایل خصوصی است</div>
                            </>
                            :
                            <>
                                <Icon name={"public"} className="w-8 h-8 text-yellow-400" />
                                <div>فایل عمومی است</div>
                            </>
                        }
                    </div>
                </div>
                <PickFile ref={pickFileRef} fileSelectListener={(file) => {
                    addTopicRequest({ course_id, title, order: 1, isPrivate, file });
                }} />
                <div className='flex items-center justify-center gap-2' onClick={() => {
                    pickFileRef.current.openFilePicker();
                }}>
                    <div>آپلود فایل</div>
                    <div className="w-px h-full bg-gray-400"></div>
                    <Icon name={"uploadfile"} className="w-8 h-8 text-green-400" />
                </div>
            </div>
        </div>
    );
};

export default AddTopic;