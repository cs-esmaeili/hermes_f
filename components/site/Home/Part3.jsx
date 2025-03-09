'use client';

import { useRef } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

import Image from 'next/image';

const courses = [
    { id: 1, title: 'آموزش برنامه نویسی پایتون + سوالات عملی و گواهینامه', price: 900000, discountPrice: 910000, hours: 12, instructor: 'حسین صادقی', badge: 'orange' },
    { id: 2, title: 'آموزش برنامه نویسی پایتون + سوالات عملی و گواهینامه', price: 1100000, discountPrice: 910000, hours: 12, instructor: 'حسین صادقی', badge: 'green' },
    { id: 3, title: 'آموزش برنامه نویسی پایتون + سوالات عملی و گواهینامه', price: 1200000, discountPrice: 910000, hours: 12, instructor: 'حسین صادقی', badge: 'blue' },
    { id: 4, title: 'آموزش برنامه نویسی پایتون + سوالات عملی و گواهینامه', price: 780000, discountPrice: 910000, hours: 12, instructor: 'حسین صادقی', badge: 'orange' }
];

const PopularCourses = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full bg-gray-100 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-right">آموزش‌های محبوب ملی</h2>
                <button className="text-blue-500 text-sm">همه دسته‌ها</button>
            </div>
            <div className="relative">
                <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 shadow-md rounded-full z-10">
                    <AiFillCaretLeft className="w-6 h-6 text-gray-700" />
                </button>
                <div ref={scrollRef} className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth px-10">
                    {courses.map((course) => (
                        <div key={course.id} className="min-w-[250px] bg-white p-4 rounded-lg shadow-md relative">
                            <div className="text-gray-600 text-sm flex items-center gap-2">
                                <span>{course.instructor}</span>
                                <span>•</span>
                                <span>{course.hours} ساعت</span>
                            </div>
                            <div className="w-full h-20 bg-gray-200 rounded-md mt-2 flex items-center justify-center">
                                <Image src="/placeholder.png" width={80} height={80} alt="Course Thumbnail" />
                            </div>
                            <div className="mt-2 font-bold text-lg text-blue-700">{course.price.toLocaleString()} تومان</div>
                            <div className="text-gray-400 line-through text-sm">{course.discountPrice.toLocaleString()} تومان</div>
                            <p className="text-sm text-gray-700 mt-2">{course.title}</p>
                            <span className={`absolute top-2 right-2 w-4 h-4 rounded-full bg-${course.badge}-400`}></span>
                        </div>
                    ))}
                </div>
                <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 shadow-md rounded-full z-10">
                    <AiFillCaretRight className="w-6 h-6 text-gray-700" />
                </button>
            </div>
        </div>
    );
};

export default PopularCourses;
