'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const SwiperComponent = () => {
    return (
        <div className="w-full">
            {/* Container for Swiper */}
            <div className="w-full h-[300px] bg-gray-200 rounded-lg overflow-hidden">
                <Swiper
                    modules={[Pagination, Scrollbar]}
                    spaceBetween={20} // فاصله بین آیتم‌ها
                    slidesPerView={4} // تعداد آیتم‌ها در هر اسلاید
                    pagination={{ clickable: true }} // فعال کردن pagination
                    loop={false} // فعال کردن حلقه بین اسلایدها
                    speed={500} // سرعت اسکرول
                    breakpoints={{
                        640: {
                            slidesPerView: 1, // در صفحه نمایش‌های کوچک، فقط یک آیتم نمایش داده می‌شود
                        },
                        768: {
                            slidesPerView: 2, // در صفحه نمایش‌های بزرگتر، 2 آیتم نمایش داده می‌شود
                        },
                        1024: {
                            slidesPerView: 4, // در صفحه نمایش‌های خیلی بزرگ، 4 آیتم نمایش داده می‌شود
                        },
                    }}
                >
                    {/* اسلایدها */}
                    <SwiperSlide>
                        <div className="flex flex-col items-center bg-blue-300 rounded-md shadow-lg p-4 min-h-[300px]">
                            <h3 className="text-xl font-semibold">Card 1</h3>
                            <p className="mt-2">Content for card 1</p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="flex flex-col items-center bg-green-300 rounded-md shadow-lg p-4 min-h-[300px]">
                            <h3 className="text-xl font-semibold">Card 2</h3>
                            <p className="mt-2">Content for card 2</p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="flex flex-col items-center bg-red-300 rounded-md shadow-lg p-4 min-h-[300px]">
                            <h3 className="text-xl font-semibold">Card 3</h3>
                            <p className="mt-2">Content for card 3</p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="flex flex-col items-center bg-yellow-300 rounded-md shadow-lg p-4 min-h-[300px]">
                            <h3 className="text-xl font-semibold">Card 4</h3>
                            <p className="mt-2">Content for card 4</p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="flex flex-col items-center bg-purple-300 rounded-md shadow-lg p-4 min-h-[300px]">
                            <h3 className="text-xl font-semibold">Card 5</h3>
                            <p className="mt-2">Content for card 5</p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="flex flex-col items-center bg-pink-300 rounded-md shadow-lg p-4 min-h-[300px]">
                            <h3 className="text-xl font-semibold">Card 6</h3>
                            <p className="mt-2">Content for card 6</p>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            <div className="swiper-pagination -bottom-32 text-center mt-4"></div>
        </div>
    );
};

export default SwiperComponent;
