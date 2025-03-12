import DivButton from '@/components/dashboard/DivButton';
import Icon from '@/components/general/Icon';
import React from 'react';
import CourseCard from '../General/CourseCard';



const Part7 = () => {
    return (
        <div className='flex grow lg:bg-tertiary rtl p-12 lg:my-80 rounded-3xl flex-wrap'>

            <div className="w-full lg:flex-[3] xl:flex-[4] bg-tertiary rounded-3xl p-5">
                <div className='text-center text-2xl font-black mb-5'>مقالات وتجارب آموزشى سراسر جهان</div>
                <div className='opacity-75 text-center lg:text-right'>
                    <div>
                        نوشتن ويادداشت بردارى از تجربيات افراد از زمان قديم
                    </div>
                    <div>
                        وبه اشتراك كذارى آن يك امر ديرينه است
                    </div>
                    <div>
                        ما در هرمس جديد ترين مقالات وتجربيات رو براى شما به اشتراک ميكزاريم
                    </div>
                </div>
                <DivButton className="bg-green-400 !w-fit gap-3 mx-auto lg:my-10 lg:mx-0 text-xl !px-10 dark:text-textcolor text-white mt-5 ">
                    <span>شروع یادگیری</span>
                    <Icon name={"multipleforwardleft"} className={"w-8 h-8"} />
                </DivButton>
            </div>

            <div className="flex flex-wrap lg:flex-nowrap justify-evenly w-full lg:flex-[7] xl:flex-[6] pt-5 lg:p-0">

                
                <div className='w-full md:w-fit lg:flex-1 relative'>
                    <div className='justify-center items-center lg:justify-start lg:items-start lg:absolute lg:top-1/3 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 flex flex-col gap-5'>
                        <CourseCard />
                        <CourseCard />
                    </div>
                </div>
                
                <div className='w-full md:w-fit lg:flex-1 relative'>
                    <div className='justify-center items-center lg:justify-start lg:items-start lg:absolute lg:top-2/3 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 flex flex-col gap-5'>
                        <CourseCard />
                        <CourseCard />
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Part7;