"use client";

import dynamic from "next/dynamic";
import Think from "@/public/assets/animations/think.json";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const Illustration = () => {
    return (
        <div className="relative w-full h-50 sm:h-62 md:h-70  lg:h-[27rem] order-1 lg:order-none">
            <Lottie animationData={Think} className="w-full h-full" />
        </div>
    );
};

export default Illustration;