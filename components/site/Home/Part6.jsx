import Icon from '@/components/general/Icon';
import React from 'react';

const Part6 = () => {
    return (
        <div className='flex flex-col grow gap-4'>
            <div className='flex grow justify-center items-center mb-5 text-2xl md:text-4xl font-bold'>
                مسیر های یادگیری
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 rtl'>

                <div className='flex flex-col flex-1 gap-3 relative'>
                    <div className='flex flex-col bg-[#ddebff] dark:bg-secondary p-3 md:p-5 rounded-3xl rl'>
                        <div className='flex grow justify-center items-center text-lg md:text-xl font-bold mb-3 md:mb-5'>
                            نرم افزار های کاربری پول ساز
                        </div>
                        <div className='flex grow justify-between items-start'>
                            <div className='flex flex-col text-sm md:text-md gap-3'>
                                <div>طراحی وب سایت</div>
                                <div>بازار های مالی و ارز دیجیتال</div>
                                <div>ادیت و طراحی ویدیو</div>
                                <div>طراحی و تدوین عکس و ویدیو</div>
                            </div>
                            <Icon name="moneyBag" className="h-24 w-24 md:h-32 md:w-32 text-textcolor" />
                        </div>
                        <div className='flex w-full items-end justify-center text-accent mt-3 md:mt-5 cursor-pointer select-none'>
                            <Icon name="multipleforwardleft" className="h-6 w-6 md:h-7 md:w-7" />
                            <span>مسیر های بیشتر</span>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col flex-1 gap-3 relative'>
                    <div className='flex flex-col bg-[#ddebff] dark:bg-secondary p-3 md:p-5 rounded-3xl'>
                        <div className='flex grow justify-center items-center text-lg md:text-xl font-bold mb-3 md:mb-5'>
                            مهارت های عمومی کامپیوتر
                        </div>
                        <div className='flex grow justify-between items-start'>
                            <div className='flex flex-col text-sm md:text-md gap-3'>
                                <div>مهارت های 7 گانه ICDL</div>
                                <div>آموزش ورد و اکسل</div>
                                <div>آموزش تایپ تند زنی</div>
                                <div>مبانی رایانه</div>
                            </div>
                            <Icon name="cupStar" className="h-24 w-24 md:h-32 md:w-32 text-textcolor" />
                        </div>
                        <div className='flex w-full items-end justify-center text-accent mt-3 md:mt-5 cursor-pointer select-none'>
                            <Icon name="multipleforwardleft" className="h-6 w-6 md:h-7 md:w-7" />
                            <span>مسیر های بیشتر</span>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col flex-1 gap-3 relative'>
                    <div className='flex flex-col bg-[#ddebff] dark:bg-secondary p-3 md:p-5 rounded-3xl'>
                        <div className='flex grow justify-center items-center text-lg md:text-xl font-bold mb-3 md:mb-5'>
                            شروع برنامه نویسی
                        </div>
                        <div className='flex grow justify-between items-start'>
                            <div className='flex flex-col text-sm md:text-md gap-3'>
                                <div>آموزش Html</div>
                                <div>آموزش Css</div>
                                <div>آموزش PhP</div>
                                <div>آموزش Java</div>
                            </div>
                            <Icon name="sideBarCode" className="h-24 w-24 md:h-32 md:w-32 text-textcolor" />
                        </div>
                        <div className='flex w-full items-end justify-center text-accent mt-3 md:mt-5 cursor-pointer select-none'>
                            <Icon name="multipleforwardleft" className="h-6 w-6 md:h-7 md:w-7" />
                            <span>مسیر های بیشتر</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Part6;
