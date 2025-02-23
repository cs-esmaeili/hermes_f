'use client';

import CustomImage from '@/components/dashboard/CustomImage';
import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import DivButton from '../DivButton';

const Icdl = ({ image, text }) => {
    const [scale, setScale] = useState(0.3);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const exportRef = useRef(null);
    const containerRef = useRef(null);
    const isDragging = useRef(false);
    const lastMousePosition = useRef({ x: 0, y: 0 });

    const [imageSize, setImageSize] = useState({ width: 800, height: 600 });

    useEffect(() => {
        const img = new Image();
        img.src = `${process.env.NEXT_PUBLIC_API}assets/back.jpg`;
        img.onload = () => {
            setImageSize({ width: img.width, height: img.height });

            // محاسبه موقعیت اولیه به‌طوری که تصویر در مرکز باشد
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setPosition({
                    x: (rect.width - img.width * scale) / 2,
                    y: (rect.height - img.height * scale) / 2,
                });
            }
        };
    }, []);

    const handleWheel = (event) => {
        event.preventDefault();
        const zoomFactor = 0.1;
        let newScale = scale + (event.deltaY > 0 ? -zoomFactor : zoomFactor);
        newScale = Math.min(Math.max(newScale, 0.2), 2);

        // محاسبه تغییر موقعیت هنگام زوم
        const rect = containerRef.current.getBoundingClientRect();
        const offsetX = (event.clientX - rect.left) / rect.width;
        const offsetY = (event.clientY - rect.top) / rect.height;
        const dx = (offsetX - 0.5) * imageSize.width * (scale - newScale);
        const dy = (offsetY - 0.5) * imageSize.height * (scale - newScale);

        setPosition({ x: position.x + dx, y: position.y + dy });
        setScale(newScale);
    };

    const handleMouseDown = (event) => {
        isDragging.current = true;
        lastMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseMove = (event) => {
        if (!isDragging.current) return;
        const dx = event.clientX - lastMousePosition.current.x;
        const dy = event.clientY - lastMousePosition.current.y;
        setPosition({ x: position.x + dx, y: position.y + dy });
        lastMousePosition.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleExport = async () => {
        if (!exportRef.current) return;

        try {
            const dpr = window.devicePixelRatio || 1;

            const originalTransform = exportRef.current.style.transform;
            exportRef.current.style.transform = 'scale(1) translate(0, 0)';

            const canvas = await html2canvas(exportRef.current, {
                scale: dpr,
                useCORS: true,
                backgroundColor: null,
                width: imageSize.width,
                height: imageSize.height,
                imageSmoothingEnabled: true,
            });

            exportRef.current.style.transform = originalTransform;

            const dataUrl = canvas.toDataURL('image/png', 1.0);
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'certificate.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting image:', error);
        }
    };

    return (
        <div className='flex flex-col items-center'>
            <div
                ref={containerRef}
                className='flex justify-center items-center overflow-hidden select-none'
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ width: '100%', height: '80vh', cursor: 'grab' }}>
                <div
                    ref={exportRef}
                    className="relative flex justify-center items-center border-4 border-red-500"
                    style={{
                        width: `${imageSize.width}px`,
                        height: `${imageSize.height}px`,
                        transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                        transition: 'transform 0.1s ease-out',
                        position: 'relative',
                        backgroundColor: 'white',
                    }}>
                    <img
                        src={image}
                        alt="Background"
                        className="absolute w-full h-full object-cover"
                    />

                    {/* محتوای مدرک */}
                    <div className='absolute inset-0 flex flex-col justify-center items-center border-4 border-red-500 text-black p-4'>
                        <div className='flex w-full items-center justify-center text-6xl'>به نام خدا</div>
                        <div className='flex w-full items-center justify-center text-6xl'>
                            <CustomImage src={`${process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}`} width={200} height={200} />
                        </div>
                        <div className='flex w-full items-center justify-center text-3xl mt-10'>{text}</div>
                    </div>
                </div>
            </div>
            <div className='flex grow justify-center items-center'>
                <DivButton onClick={handleExport} className="w-fit bg-blue-400 j text-textcolor h-fit">
                    Export Certificate (High Quality)
                </DivButton>
            </div>
        </div>
    );
};

export default Icdl;
