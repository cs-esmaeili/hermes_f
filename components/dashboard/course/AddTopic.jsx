import Icon from '@/components/general/Icon';
import CustomInput from '../CustomInput';
import { useState, useEffect, useRef } from 'react';
import useAddTopic from '@/hooks/course/useAddTopic';
import PickFile from '@/components/dashboard/PickFile';
import ProgressBar from '@/components/dashboard/ProgressBar';

const AddTopic = ({ course_id, refreshList }) => {

    const [isPrivate, setIsPrivate] = useState(true);
    const [title, setTitle] = useState("");
    const [persent, setPersent] = useState(0);
    // const [file, setFile] = useState(null);
    const pickFileRef = useRef(null);
    const { addTopicRequest } = useAddTopic(() => { refreshList() }, (persent) => setPersent(persent));

    return (
        <div className={`flex flex-col justify-center bg-primary mt-3 border-2 border-dashed border-blue-400 p-1 ${process.env.NEXT_PUBLIC_DIRECTION}`}>
            <div className='flex  grow h-fit justify-between rounded-md p-3   cursor-pointer select-none'>
                <div className='relative flex items-center justify-center gap-2 pr-3'>
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
            <ProgressBar progress={persent} setProgress={setPersent} />
        </div>
    );
};

export default AddTopic;