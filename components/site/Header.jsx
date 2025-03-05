
import React from "react";
import CustomImage from "../dashboard/CustomImage";
import CustomInput from "../dashboard/CustomInput";
import DivButton from "../dashboard/DivButton";
import Icon from "../general/Icon";
import { VscColorMode } from "react-icons/vsc";
import NavigationMenu from "@/components/site/NavigationMenu";

const Header = () => {
    return (
        <div className="flex flex-col rtl">

            <div className="flex mt-5 bg-secondary rounded-2xl p-8 justify-center items-center rtl gap-20">
                <div className="w-3/12">
                    <CustomImage
                        src={process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}
                        width={100}
                        height={100}
                    />
                </div>
                <div className="w-5/12 flex flex-row justify-center items-center gap-2">
                    <div className="bg-primary flex grow justify-start items-center rounded-xl gap-1 p-2">
                        <Icon className={"text-textcolor w-7 h-7"} name={"search"} />
                        <CustomInput
                            className={"bg-transparent !w-full outline-none"}
                            containerClassName={"!w-full"}
                            placeholder={"چه دوره ای نیاز دارید؟"}
                        />
                    </div>
                    <DivButton className="bg-accent !w-fit text-textcolor !p-2 px-5 gap-2">
                        <span>تدریس کنید</span>
                        <Icon className={"text-textcolor w-7 h-7"} name={"userSpeak"} />
                    </DivButton>
                </div>

                <div className="w-fit min-w-fit flex ltr gap-2">
                    <div className="flex justify-center items-center bg-primary rounded-full relative pl-[50px] hover:bg-blue-400 transition cursor-pointer">
                        <div className="absolute left-0 rounded-full border-2 border-secondary">
                            <CustomImage src={"/assets/images/avatar.jpg"} width={50} height={50} />
                        </div>
                        <div className="p-2 py-3 pr-3  ">پروفایل من</div>
                    </div>

                    <div className="relative">
                        <button
                            popoverTarget="cartPopover"
                            className="flex justify-center items-center bg-primary rounded-full p-3"
                        >
                            <Icon className={"text-textcolor w-7 h-7"} name={"cart"} />
                        </button>

                        <div
                            id="cartPopover"
                            popover="auto"
                            className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-lg p-3"
                        >
                            <h3 className="font-bold text-lg">سبد خرید</h3>
                            <p className="text-sm text-gray-600 mt-2">سبد خرید شما خالی است.</p>
                        </div>
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
