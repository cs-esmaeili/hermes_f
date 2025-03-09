import CustomImage from '@/components/dashboard/CustomImage';
import Icon from '@/components/general/Icon';

const Part2 = () => {
    return (
        <div className='flex flex-col grow h-fit rtl md:mt-10 gap-5'>
            <div className='flex justify-between w-full pr-3 my-16 md:my-0 opacity-75'>
                <span >دسته بندی اصلی و سریع</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[85%_15%] lg:grid-cols-[87%_13%] gap-3 rtl">

                <div className=" items-center relative h-full gap-3 text-xl my-5 md:mt-0 flex flex-col bg-secondary rounded-3xl p-4 order-first md:order-last">
                   
                    <div className='absolute -top-20 left-1/2 transform -translate-x-1/2'>
                        <Icon name={"cupfirst"} className={"h-16 w-16 text-orange-400"} />
                    </div>
                    
                    <span className='min-w-fit text-center text-nowrap'>کلمات کلیدی</span>
                    <span className='min-w-fit text-center text-nowrap'>کلمات کلیدی</span>
                    <span className='min-w-fit text-center text-nowrap'>کلمات کلیدی</span>
                    <span className='min-w-fit text-center text-nowrap'>کلمات کلیدی</span>
                    <span className='min-w-fit text-center text-nowrap'>کلمات کلیدی</span>
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] min-h-fit gap-4 justify-items-center">
                    <div className='justify-items-center'>
                        <div className="relative w-[120px] h-[120px] bg-white rounded-3xl">
                            <CustomImage
                                src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                                fill
                                objectFit="scale-down"
                            />
                        </div>
                        <div className='mt-2 '>دسته بندی</div>
                    </div>
                    <div className='justify-items-center'>
                        <div className="relative w-[120px] h-[120px] bg-white rounded-3xl">
                            <CustomImage
                                src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                                fill
                                objectFit="scale-down"
                            />
                        </div>
                        <div className='mt-2 '>دسته بندی</div>
                    </div>
                    <div className='justify-items-center'>
                        <div className="relative w-[120px] h-[120px] bg-white rounded-3xl">
                            <CustomImage
                                src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                                fill
                                objectFit="scale-down"
                            />
                        </div>
                        <div className='mt-2 '>دسته بندی</div>
                    </div>
                    <div className='justify-items-center'>
                        <div className="relative w-[120px] h-[120px] bg-white rounded-3xl">
                            <CustomImage
                                src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                                fill
                                objectFit="scale-down"
                            />
                        </div>
                        <div className='mt-2 '>دسته بندی</div>
                    </div>
                    <div className='justify-items-center'>
                        <div className="relative w-[120px] h-[120px] bg-white rounded-3xl">
                            <CustomImage
                                src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                                fill
                                objectFit="scale-down"
                            />
                        </div>
                        <div className='mt-2 '>دسته بندی</div>
                    </div>
                    <div className='justify-items-center'>
                        <div className="relative w-[120px] h-[120px] bg-white rounded-3xl">
                            <CustomImage
                                src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                                fill
                                objectFit="scale-down"
                            />
                        </div>
                        <div className='mt-2 '>دسته بندی</div>
                    </div>
                    <div className='justify-items-center'>
                        <div className="relative w-[120px] h-[120px] bg-white rounded-3xl">
                            <CustomImage
                                src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                                fill
                                objectFit="scale-down"
                            />
                        </div>
                        <div className='mt-2 '>دسته بندی</div>
                    </div>
                    <div className='justify-items-center'>
                        <div className="relative w-[120px] h-[120px] bg-white rounded-3xl">
                            <CustomImage
                                src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                                fill
                                objectFit="scale-down"
                            />
                        </div>
                        <div className='mt-2 '>دسته بندی</div>
                    </div>
                    <div className='justify-items-center'>
                        <div className="relative w-[120px] h-[120px] bg-white rounded-3xl">
                            <CustomImage
                                src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                                fill
                                objectFit="scale-down"
                            />
                        </div>
                        <div className='mt-2 '>دسته بندی</div>
                    </div>
                    <div className='justify-items-center'>
                        <div className="relative w-[120px] h-[120px] bg-white rounded-3xl">
                            <CustomImage
                                src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                                fill
                                objectFit="scale-down"
                            />
                        </div>
                        <div className='mt-2 '>دسته بندی</div>
                    </div>
                    <div className='justify-items-center'>
                        <div className="relative w-[120px] h-[120px] bg-white rounded-3xl">
                            <CustomImage
                                src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                                fill
                                objectFit="scale-down"
                            />
                        </div>
                        <div className='mt-2 '>دسته بندی</div>
                    </div>
                    <div className='justify-items-center'>
                        <div className="relative w-[120px] h-[120px] bg-white rounded-3xl">
                            <CustomImage
                                src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                                fill
                                objectFit="scale-down"
                            />
                        </div>
                        <div className='mt-2 '>دسته بندی</div>
                    </div>
                    <div className='justify-items-center'>
                        <div className="relative w-[120px] h-[120px] bg-white rounded-3xl">
                            <CustomImage
                                src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                                fill
                                objectFit="scale-down"
                            />
                        </div>
                        <div className='mt-2 '>دسته بندی</div>
                    </div>
                    <div className='justify-items-center'>
                        <div className="relative w-[120px] h-[120px] bg-white rounded-3xl">
                            <CustomImage
                                src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                                fill
                                objectFit="scale-down"
                            />
                        </div>
                        <div className='mt-2 '>دسته بندی</div>
                    </div>
                    <div className='justify-items-center'>
                        <div className="relative w-[120px] h-[120px] bg-white rounded-3xl">
                            <CustomImage
                                src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                                fill
                                objectFit="scale-down"
                            />
                        </div>
                        <div className='mt-2 '>دسته بندی</div>
                    </div>
                    <div className='justify-items-center'>
                        <div className="relative w-[120px] h-[120px] bg-white rounded-3xl">
                            <CustomImage
                                src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                                fill
                                objectFit="scale-down"
                            />
                        </div>
                        <div className='mt-2 '>دسته بندی</div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Part2;
