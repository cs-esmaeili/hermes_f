'use client';

import CustomImage from '@/components/dashboard/CustomImage';
import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import DivButton from '../DivButton';
import CustomInput from '../CustomInput';
import QRCode from 'react-qr-code';

const convertToFormData = (data) => {
    return {
        score: data?.score || 0,
        image: data?.user?.image?.url || "",
        fullName: data?.user.fullName || "",
        nationalCode: data?.user.nationalCode || "",
        fatherName: data?.user.fatherName || "",
        startDate: data?.startDate || "",
        endDate: data?.endDate || "",
        title: data?.title || "",
        backImageV: data?.image || `${process.env.NEXT_PUBLIC_API}assets/back.jpg`,
        backImageH: data?.image || `${process.env.NEXT_PUBLIC_API}assets/back.jpg`,
    }
}

const General = ({ data, dijital = true, editMode = false }) => {

    const [scale, setScale] = useState(0.2);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dijitalForm, setDijitalForm] = useState(dijital);
    const exportRef = useRef(null);
    const containerRef = useRef(null);
    const isDragging = useRef(false);
    const lastMousePosition = useRef({ x: 0, y: 0 });

    const [imageSize, setImageSize] = useState({ width: 800, height: 600 });
    const [formData, setFormData] = useState(convertToFormData(data));
    console.log(convertToFormData(data));


    const handleInputChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };


    useEffect(() => {
        const img = new Image();
        img.src = `${process.env.NEXT_PUBLIC_API}assets/back.jpg`;
        img.onload = () => {
            setImageSize({ width: img.width, height: img.height });

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
        <div className='flex grow overflow-hidden gap-3'>

            <div className='flex w-1/5 flex-col gap-3 items-center  bg-secondary  rounded-lg'>

                <DivButton onClick={handleExport} className="w-full bg-blue-400 text-textcolor h-fit justify-center">
                    دانلود مدرک
                </DivButton>

                {editMode &&
                    <div className='flex flex-col w-full gap-3'>
                        {dijitalForm ?
                            <DivButton className="w-full bg-red-400 text-textcolor h-fit justify-center"
                                onClick={() => {
                                    setDijitalForm(!dijitalForm);
                                }}
                            >مشاهد نسخه اصلی</DivButton>
                            :
                            <DivButton className="w-full bg-blue-400 text-textcolor h-fit justify-center"
                                onClick={() => {
                                    setDijitalForm(!dijitalForm);
                                }}
                            >مشاهده نسخه دیجیتال</DivButton>
                        }
                        <CustomInput rightLabel={"نمره"} inputClassName={"bg-primary"} containerClassName={"w-full"} value={formData.score} onChange={handleInputChange('score')} />
                        <CustomInput rightLabel={"نام خانوادگی"} inputClassName={"bg-primary"} containerClassName={"w-full"} value={formData.fullName} onChange={handleInputChange('fullName')} />
                        <CustomInput rightLabel={"کد ملی"} inputClassName={"bg-primary"} containerClassName={"w-full"} value={formData.nationalCode} onChange={handleInputChange('nationalCode')} />
                        <CustomInput rightLabel={"نام پدر"} inputClassName={"bg-primary"} containerClassName={"w-full"} value={formData.fatherName} onChange={handleInputChange('fatherName')} />

                        <DivButton onClick={handleExport} className="w-full bg-yellow-500 text-textcolor h-fit justify-center">
                            ساخت مدرک
                        </DivButton>

                    </div>
                }

            </div>

            <div className='flex grow overflow-hidden relative justify-center items-center' >
                <div className='flex flex-col items-center absolute'>
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
                                src={`${process.env.NEXT_PUBLIC_API}untouchable/certificats/General/${(dijitalForm) ? "dijitalB.jpg" : "normalB.jpg"}`}
                                alt="Background"
                                className="absolute w-full h-full object-cover"
                            />

                            {/* محتوای مدرک */}
                            <div className='absolute inset-0 flex flex-col justify-center items-center border-4 border-red-500 text-black p-4'>
                                <div className='flex w-full items-center justify-center text-6xl'>{formData.fullName}</div>
                                <div className='flex w-full items-center justify-center text-6xl'>{formData.nationalCode}</div>
                                <div className='flex w-full items-center justify-center text-6xl'>{formData.fatherName}</div>
                                <div className='flex w-full items-center justify-center text-6xl'>{formData.score}</div>
                                <div className='flex w-full items-center justify-center text-6xl'>{formData.startDate}</div>
                                <div className='flex w-full items-center justify-center text-6xl'>{formData.endDate}</div>
                                <div className='flex w-full items-center justify-center text-6xl'>{formData.title}</div>
                                <div className='flex w-full items-center justify-center text-6xl mt-5'>
                                    <CustomImage src={`${process.env.NEXT_PUBLIC_API + process.env.NEXT_PUBLIC_LOGO_URL}`} width={200} height={200} />
                                </div>
                                <QRCode value={`${process.env.NEXT_PUBLIC_API}cert/${formData.session_id}`} size={256} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default General;
