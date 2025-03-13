import React from "react";
import CustomImage from "../../dashboard/CustomImage";
import CustomInput from "../../dashboard/CustomInput";
import DivButton from "../../dashboard/DivButton";
import Icon from "../../general/Icon";
import { VscColorMode } from "react-icons/vsc";
import NavigationMenu from "@/components/site/Header/NavigationMenu";
import Sidebar from "@/components/site/Header/SideBar";

const Header = () => {
    return (
        <div className="flex flex-col rtl">
            <div className="flex items-center justify-between mt-5 bg-secondary rounded-2xl p-4 lg:hidden overflow-hidden">

                <Sidebar />

                <div className="relative w-40 sm:w-48 md:w-56 lg:w-72 h-16 ">
                    <CustomImage
                        src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                        fill
                        objectFit="scale-down"
                    />
                </div>
                
                <div className="flex items-center gap-2">
                    <div className="flex justify-center items-center bg-primary rounded-full relative pl-12 hover:bg-blue-400 transition cursor-pointer">
                        <div className="absolute left-0 rounded-full border-2 border-secondary">
                            <CustomImage src="/assets/images/avatar.jpg" width={50} height={50} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex items-center justify-between mt-5 bg-secondary rounded-2xl p-7 overflow-hidden relative">
                <div className="flex items-center">
                    <div className="relative w-72 h-16">
                        <CustomImage
                            src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                            fill
                            objectFit="scale-down"
                        />
                    </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary flex grow justify-start items-center rounded-xl gap-1 p-2">
                            <Icon className="text-textcolor w-7 h-7" name="search" />
                            <CustomInput
                                className="bg-transparent !w-full outline-none"
                                containerClassName="!w-full"
                                placeholder="چه دوره ای نیاز دارید؟"
                            />
                        </div>
                        <DivButton className="bg-accent !w-fit  !py-[6px] !px-5 gap-2 flex-nowrap min-w-fit !rounded-lg dark:text-textcolor text-white">
                            <span>تدریس کنید</span>
                            <Icon className="w-7 h-7" name="userSpeak" />
                        </DivButton>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex justify-center items-center bg-primary rounded-l-3xl rounded-r-xl relative pl-12 hover:bg-blue-400 transition cursor-pointer">
                        <div className="absolute left-0 rounded-full border-2 border-secondary">
                            <CustomImage src="/assets/images/avatar.jpg" width={50} height={50} />
                        </div>
                        <div className="p-2 py-3 pr-3">پروفایل من</div>
                    </div>
                    <div className="flex justify-center items-center bg-primary rounded-full p-3">
                        <Icon className="text-textcolor w-7 h-7" name="cart" />
                    </div>
                    <div className="flex justify-center items-center bg-primary rounded-full p-3">
                        <VscColorMode className="w-7 h-7" />
                    </div>
                </div>

            </div>

            <NavigationMenu />
        </div>
    );
};

export default Header;
