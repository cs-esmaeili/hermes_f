"use client";

import dynamic from "next/dynamic";
import Think from "@/public/assets/animations/think.json";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const Illustration = () => {
    return (
        <div className="flex grow items-center justify-center">
            <div className="relative w-full  h-45 sm:h-50 md:h-56 lg:h-70  lg:h-[27rem] order-1 lg:order-none">
                <Lottie animationData={Think} className="w-full h-full" />
            </div>
        </div>
    );
};

export default Illustration;