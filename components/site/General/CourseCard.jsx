import CustomImage from '@/components/dashboard/CustomImage';
import DivButton from '@/components/dashboard/DivButton';
import Icon from '@/components/general/Icon';

const CourseCard = () => {
    return (
        <div className='flex flex-col h-[300px] w-[300] bg-secondary rounded-lg p-3'>

            <div className='flex-1'>
                <div className="relative bg-primary 
                            rounded-[0.5rem] 
                            w-full
                            h-full">
                </div>
            </div>

            <div className='flex flex-col flex-1'>
                <div className='flex flex-1 font-bold text-lg items-center '>
                    تیم هرمس در بالاترین رتبه
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex flex-1 justify-between'>

                        <div className='flex items-center text-sm gap-1'>
                            <div className="rounded-full border-2 border-secondary">
                                <CustomImage src="/assets/images/avatar.jpg" width={30} height={30} />
                            </div>
                            <span>هرمس</span>
                        </div>
                        <div className='flex justify-center items-center'>
                            <DivButton className='bg-primary text-xs !p-2 gap-1'>
                                <Icon name={"multipleforwardleft"} className={"w-4 h-4"} />
                                <span>جاوا اسکریپت</span>
                            </DivButton>
                        </div>
                    </div>
                    <div className='flex flex-2 gap-2 justify-between'>

                        <div className='flex gap-2'>
                            <div className='bg-gray-400 bg-opacity-25 p-1 rounded-lg'>
                                <Icon name={"chatLine"} className={"w-4 h-4 text-textcolor opacity-100"} />
                            </div>
                            <div className='bg-red-400 bg-opacity-25 p-1 rounded-lg'>
                                <Icon name={"heart"} className={"w-4 h-4 text-red-500 opacity-100"} />
                            </div>
                            <div className='bg-blue-400 bg-opacity-25 p-1 rounded-lg'>
                                <Icon name={"bookmarkEmpty"} className={"w-4 h-4"} />
                            </div>
                        </div>
                        <div className='flex gap-1 items-center justify-center opacity-75'>
                            <Icon name={"stopWatch"} className={"w-4 h-4 text-textcolor"} />
                            <span className='text-xs'>زمان مطالعه : 6 دقیقه</span>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};
export default CourseCard;