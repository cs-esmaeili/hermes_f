'use client'

import { useRef, useState } from 'react';

const Part4 = () => {
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

    return (
        <div className='flex grow bg-yellow-300 my-10 justify-center overflow-hidden'>
            <div
                className='swapContainer flex bg-red-400 max-w-[1100px] h-[500px] gap-3 overflow-x-auto hide-scrollbar'
                onMouseDown={handleonMouseDown}
                onMouseMove={handleonMouseMove}
                onMouseUp={handleonMouseUp}
                onMouseLeave={handleonMouseUp}
                onTouchStart={handleonTouchStart}  
                onTouchMove={handleonTouchMove}
                onTouchEnd={handleonTouchEnd}
                ref={swiperRef}
            >
                {Array(20).fill(null).map((_, index) => (
                    <div key={index} className='select-none cursor-pointer item flex h-full min-w-[250px] bg-purple-500 border-2 border-white'>
                        item {index + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Part4;
