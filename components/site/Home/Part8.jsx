import DivButton from '@/components/dashboard/DivButton';
import Icon from '@/components/general/Icon';

const Part8 = () => {
    return (
        <div className='flex grow rtl flex-wrap'>

            <div className='flex w-full p-10 md:p-0 md:w-fit md:flex-[1] flex-col gap-6 items-center justify-center'>
                <div className='text-2xl font-bold'>
                    به جمع مدرسین هرمس بپیوندید
                </div>
                <div className='text-lg text-center'>
                    برای تدریس و همکاری در وب سایت هرمس از طریق لینک زیر اقدام کنید
                </div>
                <DivButton className="bg-tertiary !w-fit  dark:text-textcolor text-white ">
                    <span>تدریس در هرمس</span>
                    <Icon name={"hat"} className={"w-8 h-8"} />
                </DivButton>

            </div>

            <div className='flex w-full md:w-fit md:flex-[1] items-center justify-center p-10'>
                <div className="relative bg-white 
                                            rounded-[0.5rem] 
                                            md:rounded-[1rem] 
                                            w-[300px]
                                            h-[300px]"
                >
                </div>
            </div>

        </div>
    );
};

export default Part8;