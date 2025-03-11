'use client'

import Icon from '@/components/general/Icon';
import { useRef, useState } from 'react';

const Part3 = () => {
    const [startX, setStartX] = useState(0);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const swiperRef = useRef(null);

    function handleonMouseDown(event) {
        setStartX(event.clientX);
        setIsMouseDown(true);
    }

    function handleonMouseMove(event) {
        if (!isMouseDown || !swiperRef.current) return;
        event.preventDefault();
        const deltaX = event.clientX - startX;
        swiperRef.current.scrollLeft = swiperRef.current.scrollLeft - deltaX;
        setStartX(event.clientX);
    }

    function handleonMouseUp() {
        setIsMouseDown(false);
    }

    function handleonTouchStart(event) {
        setStartX(event.touches[0].clientX);
        setIsMouseDown(true);
    }

    function handleonTouchMove(event) {
        if (!isMouseDown || !swiperRef.current) return;
        event.preventDefault();
        const deltaX = event.touches[0].clientX - startX;
        swiperRef.current.scrollLeft = swiperRef.current.scrollLeft - deltaX;
        setStartX(event.touches[0].clientX);
    }

    function handleonTouchEnd() {
        setIsMouseDown(false);
    }

    const CourseCard = ({ teacher, duration, price, title }) => {
        return (
            <div className="select-none cursor-pointer flex flex-col h-full min-w-[300px] bg-secondary rounded-3xl p-4 shadow-md ">

                <div className='flex'>

                    <div className="flex flex-1 flex-col items-start pr-3 rtl justify-evenly">

                        <div className='flex text-nowrap items-center gap-2 text-sm'>
                            <Icon className={"w-6 h-6"} name={"shieldUserEmpty"}/>
                            <span>
                                {teacher}
                            </span>
                        </div>

                        <div className='flex text-nowrap items-center gap-2 text-sm'>
                            <Icon className={"w-6 h-6"} name={"clock"}/>
                            <span>
                                {duration}
                            </span>
                        </div>

                        <div className='text-md text-accent font-bold'>
                            {`${price} تومان`}
                        </div>

                        <div className='line-through font-thin flex text-nowrap items-center gap-2 text-sm'>
                            <span>
                                {`${price} تومان`}
                            </span>
                            <Icon className={"w-6 h-6 text-green-500"} name={"discount"}/>
                        </div>

                    </div>

                    <div className="relative bg-white 
                                            rounded-[0.5rem] 
                                            md:rounded-[1rem] 
                                            w-[60px] h-[60px] 
                                            sm:w-[80px] sm:h-[80px]
                                            md:w-[120px] md:h-[120px]"
                    >
                    </div>

                </div>
                <div className="mt-2 rtl text-sm opacity-75 flex grow justify-center items-center">{title}</div>
            </div>
        );
    };


    return (
        <div className='flex flex-col grow  justify-center overflow-hidden'>
            <div className='flex grow rtl text-3xl mb-8 font-extrabold'>آموزش های محبوب بین المللی</div>
            <div
                className='swapContainer flex w-full h-[230px] gap-3 overflow-x-auto hide-scrollbar rtl'
                onMouseDown={handleonMouseDown}
                onMouseMove={handleonMouseMove}
                onMouseUp={handleonMouseUp}
                onMouseLeave={handleonMouseUp}
                onBlur={handleonMouseUp}
                onTouchStart={handleonTouchStart}
                onTouchMove={handleonTouchMove}
                onTouchEnd={handleonTouchEnd}
                ref={swiperRef}
            >
                {Array(20).fill(null).map((_, index) => (
                    <div key={index} className='select-none cursor-pointer item flex h-full min-w-[300px]'>
                        <CourseCard
                            teacher="حسین صادقی"
                            duration="۱۲ ساعت"
                            price="۱.۲۰۰.۰۰۰"
                            title="آموزش برنامه نویسی پایتون + سوالات عملی و گواهینامه"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Part3;
