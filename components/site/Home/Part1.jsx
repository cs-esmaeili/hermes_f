

import DivButton from "@/components/dashboard/DivButton";
import Icon from "@/components/general/Icon";
import Illustration from "./Illustration";


const Part1 = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 flex-col-reverse lg:flex-row mt-20" dir="rtl">
            <div className="flex flex-col justify-center px-10  mt-10 lg:mt-0 order-2 lg:order-none">
                <div className="font-[1000] flex flex-col gap-3 text-center lg:text-right ">
                    <div className="text-6xl text-balance">مرجع آموزش های</div>
                    <div className="text-7xl text-balance">ملی و بین المللی</div>
                </div>
                <div className="text-xl opacity-75 text-center lg:text-right my-10">
                    <div> همین حالا با هرمس یادگیری را شروع کن ,  رویاهاتو با آموزش به واقعیت تبدیل کن</div>
                </div>

                <DivButton className="bg-accent !w-fit gap-3 mx-auto lg:my-10 lg:mx-0 text-xl !px-10 dark:text-textcolor text-white">
                    <span>شروع یادگیری</span>
                    <Icon name={"multipleforwardleft"} className={"w-8 h-8"} />
                </DivButton>

                {/* اطلاعات آماری */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mt-5 font-medium text-2xl">

                    <div className="flex flex-col gap-10">

                        <div className="flex items-center text-nowrap">
                            <Icon name={"hat"} className={"w-8 h-8 text-red-500"} />
                            <div>+3000 آموزش بین المللی</div>
                        </div>

                        <div className="flex items-center text-nowrap">
                            <Icon name={"shieldUser"} className={"w-8 h-8 text-green-500"} />
                            <div>+1000 مدرس</div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-10">
                        <div className="flex items-center text-nowrap">
                            <Icon name={"locationPoint"} className={"w-8 h-8 text-gray-500"} />
                            <div>+1000 آموزش ملی</div>
                        </div>
                        <div className="flex items-center text-nowrap">
                            <Icon name={"bookmark"} className={"w-8 h-8 text-purple-500"} />
                            <div>گواهینامه آموزش معتبر</div>
                        </div>
                    </div>

                </div>

            </div>

            <Illustration />
        </div>
    );
};

export default Part1;