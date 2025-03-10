import CustomImage from '@/components/dashboard/CustomImage';
import Icon from '@/components/general/Icon';

const categories = Array(15).fill("دسته بندی");

const Part2 = () => {
    return (
        <div className='flex flex-col grow h-fit rtl md:mt-10 gap-5'>
            <div className='flex justify-between w-full pr-3 my-1 md:my-0 opacity-75 text-xl'>
                <span>دسته بندی اصلی و سریع</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[85%_15%] lg:grid-cols-[87%_13%] gap-3 rtl">
                <div className="relative flex flex-col items-center text-xl bg-secondary rounded-[2.5rem] p-5 order-first md:order-last gap-3 my-5 md:mt-0">
                    <div className='absolute -top-16 left-1/2 transform -translate-x-1/2'>
                        <Icon name="cupfirst" className="h-16 w-16 text-orange-500" />
                    </div>
                    {Array(5).fill("کلمات کلیدی").map((keyword, index) => (
                        <span key={index} className='text-center text-nowrap max-w-sm'>{keyword}</span>
                    ))}
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,_minmax(60px,_1fr))] 
                                sm:grid-cols-[repeat(auto-fill,_minmax(80px,_1fr))] 
                                md:grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] 
                                min-h-fit gap-4 justify-items-center">
                    {categories.map((category, index) => (
                        <div key={index} className='justify-items-center'>
                            <div className="relative bg-white 
                                            rounded-[1.5rem] 
                                            md:rounded-[2.5rem] 
                                            w-[60px] h-[60px] 
                                            sm:w-[80px] sm:h-[80px]
                                            md:w-[120px] md:h-[120px]">
                                {/* <CustomImage
                                    src={`${process.env.NEXT_PUBLIC_API}${process.env.NEXT_PUBLIC_LOGO_URL}`}
                                    fill
                                    objectFit="scale-down"
                                /> */}
                            </div>
                            <div className='mt-2 text-center'>{category}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Part2;
