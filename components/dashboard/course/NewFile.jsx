import React from 'react';

const NewFile = () => {
    return (
        <div>
            {!loading && courses?.courseMaterials && courses?.courseMaterials.map((value, index) =>
                <div className='flex  grow h-fit justify-between   rounded-md p-3  border-2 border-dashed border-blue-400 cursor-pointer select-none'>
                    <div className='relative flex items-center justify-center gap-2 pr-3'>
                        <span className="absolute right-[-27px] w-[29px] h-[29px] bg-primary border-2 border-gray-400 border-opacity-50 text-[16px] font-bold flex items-center  justify-center rounded-full leading-none ">
                            5
                        </span>
                        <div>معرفی ابزار های keyword research</div>
                        <div className="w-px h-full bg-gray-400"></div>
                        <Icon name={"lock"} className="w-8 h-8 text-blue-400" />
                        <Icon name={"public"} className="w-8 h-8 text-yellow-400" />
                        <Icon name={"trash"} className="w-8 h-8 text-red-400" />
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <div>04:40</div>
                        <div className="w-px h-full bg-gray-400"></div>
                        <Icon name={"download"} className="w-8 h-8 text-green-400" />
                    </div>
                </div>
            )}


            <div className='flex  grow h-fit justify-between   rounded-md p-3  border-2 border-dashed border-blue-400 cursor-pointer select-none'>
                <div className='relative flex items-center justify-center gap-2 pr-3'>
                    <span className="absolute right-[-27px] w-[29px] h-[29px] bg-primary border-2 border-gray-400 border-opacity-50 text-[16px] font-bold flex items-center  justify-center rounded-full leading-none ">
                        5
                    </span>
                    <div>معرفی ابزار های keyword research</div>
                    <div className="w-px h-full bg-gray-400"></div>
                    <Icon name={"lock"} className="w-8 h-8 text-blue-400" />
                    <Icon name={"public"} className="w-8 h-8 text-yellow-400" />
                    <Icon name={"trash"} className="w-8 h-8 text-red-400" />
                </div>
                <div className='flex items-center justify-center gap-2'>
                    <div>04:40</div>
                    <div className="w-px h-full bg-gray-400"></div>
                    <Icon name={"download"} className="w-8 h-8 text-green-400" />
                </div>
            </div>


            <div className='flex grow items-center justify-center border-2 border-solid border-gray-400 p-3 rounded-md'>
                <Icon name={"add"} />
                <span>افزودن فایل</span>
            </div>
        </div>
    );
};

export default NewFile;