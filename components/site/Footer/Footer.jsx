import CustomImage from '@/components/dashboard/CustomImage';
import Icon from '@/components/general/Icon';
import { FaTelegram } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { AiFillAlipayCircle } from "react-icons/ai";
import CollapsibleMenu from '@/components/general/CollapsibleMenu';

const menuItems = [
    {
        icon: <AiFillAlipayCircle />,
        title: "سایر دسته بندی ها",
        subItems: [
            { title: "داده‌کاوی و یادگیری ماشین", isActive: false, url: "/courses/data-mining" },
            { title: "لینوکس", isActive: false, url: "/courses/linux" },
            { title: "پایتون (Python)", isActive: true, url: "/courses/python" },
            { title: "هوش مصنوعی", isActive: false, url: "/courses/ai" },
            { title: "شبکه‌های کامپیوتری", isActive: false, url: "/courses/networks" }
        ]
    },
    {
        icon: <AiFillAlipayCircle />,
        title: "علوم کامپیوتر",
    },
    {
        icon: <AiFillAlipayCircle />,
        title: "مدریت و کسب و کار",
    },
    {
        icon: <AiFillAlipayCircle />,
        title: "زبان خارجی",
    },
    {
        icon: <AiFillAlipayCircle />,
        title: "اقتصاد و حسابداری",
    },
    {
        icon: <AiFillAlipayCircle />,
        title: "طراحی و گرافیک",
    },
];


const Footer = () => {
    return (
        <div className='flex flex-col grow py-5 mt-5 gap-5'>

            <div className=' grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 grow h-fit hidden md:grid'>
                <div className='flex flex-col flex-1 justify-center items-center gap-2 text-center'>
                    <Icon name={"clockSquare"} className={"h-16 w-16"} />
                    <div>هزار ساعت آموزش</div>
                </div>
                <div className='flex flex-col flex-1 justify-center items-center gap-2 text-center'>
                    <Icon name={"certificate"} className={"h-16 w-16"} />
                    <div>گواهینامه معتبر</div>
                </div>
                <div className='flex flex-col flex-1 justify-center items-center gap-2 text-center'>
                    <Icon name={"spedoMeter"} className={"h-16 w-16"} />
                    <div>دسترسی سریع و آنی</div>
                </div>
                <div className='flex flex-col flex-1 justify-center items-center gap-2 text-center'>
                    <Icon name={"verifiedCheck"} className={"h-16 w-16"} />
                    <div>تضمین کیفیت آموزش</div>
                </div>
            </div>

            <div className=' rounded-3xl p-3 gap-5  md:hidden'>
                <CollapsibleMenu menuItems={menuItems} />
            </div>

            <div className=' grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-6 grow h-fit bg-secondary rounded-3xl p-3 gap-5 hidden md:grid'>

                <div className='flex flex-col w-full justify-center items-center gap-3'>
                    <div className='flex items-center justify-center gap-2'>
                        <div>سایر دسته بندی ها</div>
                        <Icon name={"threeSquares"} className={"h-7 w-7"} />
                    </div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                </div>

                <div className='flex flex-col w-full justify-center items-center gap-3'>
                    <div className='flex items-center justify-center gap-2'>
                        <div>علوم کامپیوتر</div>
                        <Icon name={"monitor"} className={"h-7 w-7"} />
                    </div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                </div>

                <div className='flex flex-col w-full justify-center items-center gap-3'>
                    <div className='flex items-center justify-center gap-2'>
                        <div>مدیریت و کسب و کار</div>
                        <Icon name={"handMoney"} className={"h-7 w-7"} />
                    </div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                </div>

                <div className='flex flex-col w-full justify-center items-center gap-3'>
                    <div className='flex items-center justify-center gap-2'>
                        <div>زبان خارجی</div>
                        <Icon name={"globus"} className={"h-7 w-7"} />
                    </div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                </div>

                <div className='flex flex-col w-full justify-center items-center gap-3'>
                    <div className='flex items-center justify-center gap-2'>
                        <div>اقتصاد و حسابداری</div>
                        <Icon name={"calculator"} className={"h-7 w-7"} />
                    </div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                </div>

                <div className='flex flex-col w-full justify-center items-center gap-3'>
                    <div className='flex items-center justify-center gap-2'>
                        <div>طراحی و گرافیک</div>
                        <Icon name={"pallete"} className={"h-7 w-7"} />
                    </div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                    <div>تست لینک</div>
                </div>
            </div>

            <div className='flex flex-col  items-center justify-center grow h-fit rounded-3xl p-3'>

                <div className="flex flex-wrap w-full rtl gap-3 h-fit items-center justify-center md:justify-end">
                    {/* لوگو */}
                    <div className="relative w-32 sm:w-40 md:w-56 lg:w-72 h-16 mx-auto md:mx-0">
                        <CustomImage
                            src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                            fill
                            objectFit="scale-down"
                        />
                    </div>

                    {/* اطلاعات تماس */}
                    <div className="flex flex-col md:flex-row grow justify-center md:justify-between items-center gap-3 w-full md:w-auto text-center md:text-right">
                        <div className="border-b-[1px] hidden md:flex grow h-fit opacity-50"></div>
                        <div className="flex h-fit">
                            <div>مرکز تماس : </div>
                            <div className="font-bold">031-31317731</div>
                        </div>
                        <div className="flex h-fit">
                            <div>ایمیل : </div>
                            <div className="font-bold">info@hermeslearn.com</div>
                        </div>
                    </div>
                </div>


                <div className='grid grid-cols-1 md:grid-cols-2 w-full rtl'>


                    <div className='flex flex-col w-full p-3 gap-3'>
                        <div className='flex gap-1 basis-[20%]'>
                            <Icon name={"pallete"} className={"w-7 h-7"} />
                            <span>درباره هرمس</span>
                        </div>
                        <div className="flex-grow basis-[80%]">
                            مركز آموش هرمس نخستين برند آموزش هاى مجازى وآنلاين كه ازسال ٩ برند هرمس را تحت عنوان آموزش هرمس
                            با ارائه خدمات آموزش وآزمون آنلاين به همراه کواهينامه آموزش معتبر رونمایی کرد.هم اكنون همکاری با مدرسين ملی
                            وبين المللى براى توليد بسترى امن آموزشى بزركترين هدف ماست. مشاهده بيشتر
                        </div>
                    </div>


                    <div className='flex flex-col py-4 w-full gap-5 items-center md:items-end'>

                        <div className='flex justify-start gap-3 basis-[20%]'>
                            <div>
                                <FaTelegram className='w-5 h-5' />
                            </div>
                            <div>
                                <FaInstagram className='w-5 h-5' />
                            </div>
                            <div>
                                <FaFacebook className='w-5 h-5' />
                            </div>
                            <div>
                                <FaYoutube className='w-5 h-5' />
                            </div>
                        </div>

                        <div className="flex flex-row gap-3 basis-[80%]">
                            <div className="relative bg-white 
                                            rounded-[0.5rem] 
                                            md:rounded-[1rem] 
                                            w-[120px]
                                            h-[120px]"
                            >
                            </div>
                            <div className="relative bg-white 
                                            rounded-[0.5rem] 
                                            md:rounded-[1rem] 
                                            w-[120px]
                                            h-[120px]"
                            >
                            </div>
                            <div className="relative bg-white 
                                            rounded-[0.5rem] 
                                            md:rounded-[1rem] 
                                            w-[120px]
                                            h-[120px]"
                            >
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-b-[1px] flex grow h-[1px] w-full opacity-50 my-6'></div>

                <div className="flex flex-col md:flex-row items-center justify-between w-full rtl gap-5 md:gap-3">
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-5">
                        <div className="text-nowrap">تماس با ما</div>
                        <div className="text-nowrap">سوالات رایج</div>
                        <div className="text-nowrap">تدریس در هرمس</div>
                        <div className="text-nowrap">حریم خصوصی</div>
                        <div className="text-nowrap">بلاگ هرمس</div>
                    </div>
                    <div className="text-center md:text-right">
                        تمام حقوق متعلق به ((هرمس علم كستر آیريک)) است.C
                    </div>
                </div>


            </div>
        </div >
    );
};

export default Footer;