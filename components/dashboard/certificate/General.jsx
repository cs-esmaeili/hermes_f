'use client';

import CustomImage from '@/components/dashboard/CustomImage';
import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import DivButton from '../DivButton';
import CustomInput from '../CustomInput';
import QRCode from 'react-qr-code';
import PickFile from '../PickFile';
import { BsImage, BsCake2 } from "react-icons/bs";
import useCreateCertificate from "@/hooks/certificate/useCreateCertificate";
import useGetCertificateTemplates from '@/hooks/CertificateTemplate/useGetCertificateTemplates';

const convertToFormData = (data) => {
    return {
        cert_id: data?._id || "",
        score: data?.score || 0,
        fullName: data?.user.fullName || "هاها",
        nationalCode: data?.user.nationalCode || "32423",
        fatherName: data?.user.fatherName || "حسین",
        startDate: data?.startDate || "11/1",
        endDate: data?.endDate || "11/2",
        title: data?.title || "المانی",
        backImageV: data?.image || `${process.env.NEXT_PUBLIC_API}assets/back.jpg`,
        backImageH: data?.image || `${process.env.NEXT_PUBLIC_API}assets/back.jpg`,
        file: data?.user?.image?.url || null,
        cert_template_id: data?.cert_template_id || "",
    }
}
const CertName = "General";

const General = ({ data, dijital = true, editMode = false }) => {
    const pickFileRef = useRef(null);
    const [scale, setScale] = useState(0.2);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dijitalForm, setDijitalForm] = useState(dijital);
    const exportRef = useRef(null);
    const containerRef = useRef(null);
    const isDragging = useRef(false);
    const lastMousePosition = useRef({ x: 0, y: 0 });
    const [imageSize, setImageSize] = useState({ width: 800, height: 600 });
    const [formData, setFormData] = useState(convertToFormData(data));

    const { getCertificateTemplatesRequest } = useGetCertificateTemplates((templates) => {
        const matchingTemplate = templates.find(template => template.name === CertName);
        if (matchingTemplate) {
            setFormData({ ...formData, cert_template_id: matchingTemplate._id });
        }
    });

    const { createCertificateRequest } = useCreateCertificate(() => {
        setFormData(convertToFormData(null));
        getCertificateTemplatesRequest();
    }, (persent) => {

    });

    const handleInputChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };
    const handleFileChange = (file) => {
        setFormData({ ...formData, file });
    };


    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (e) {
            return false;
        }
    }


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

    useEffect(() => {
        getCertificateTemplatesRequest();
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
                    <div className='flex flex-col w-full gap-3 overflow-auto'>
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
                        <PickFile ref={pickFileRef} fileSelectListener={handleFileChange} />

                        <DivButton onClick={() => pickFileRef.current.openFilePicker()} className="w-full bg-blue-400 text-textcolor h-fit justify-center">
                            عکس
                        </DivButton>

                        <CustomInput rightLabel={"عنوان دوره"} inputClassName={"bg-primary"} containerClassName={"w-full"} value={formData.title} onChange={handleInputChange('title')} />
                        <CustomInput rightLabel={"نام خانوادگی"} inputClassName={"bg-primary"} containerClassName={"w-full"} value={formData.fullName} onChange={handleInputChange('fullName')} />
                        <CustomInput rightLabel={"کد ملی"} inputClassName={"bg-primary"} containerClassName={"w-full"} value={formData.nationalCode} onChange={handleInputChange('nationalCode')} />
                        <CustomInput rightLabel={"نام پدر"} inputClassName={"bg-primary"} containerClassName={"w-full"} value={formData.fatherName} onChange={handleInputChange('fatherName')} />
                        <CustomInput rightLabel={"نمره"} inputClassName={"bg-primary"} containerClassName={"w-full"} value={formData.score} onChange={handleInputChange('score')} />
                        <CustomInput rightLabel={"تاریخ شروع"} inputClassName={"bg-primary"} containerClassName={"w-full"} value={formData.startDate} onChange={handleInputChange('startDate')} />
                        <CustomInput rightLabel={"تاریخ پایان"} inputClassName={"bg-primary"} containerClassName={"w-full"} value={formData.endDate} onChange={handleInputChange('endDate')} />

                        <DivButton onClick={() => {
                            createCertificateRequest(formData);
                        }} className="w-full bg-yellow-500 text-textcolor h-fit justify-center">
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

                            <div className='absolute inset-0 flex flex-col justify-center items-center border-4 border-red-500 text-black p-4'>
                                <div className='flex w-full items-center justify-center text-6xl'>{formData.fullName}</div>
                                <div className='flex w-full items-center justify-center text-6xl'>{formData.nationalCode}</div>
                                <div className='flex w-full items-center justify-center text-6xl'>{formData.fatherName}</div>
                                <div className='flex w-full items-center justify-center text-6xl'>{formData.score}</div>
                                <div className='flex w-full items-center justify-center text-6xl'>{formData.startDate}</div>
                                <div className='flex w-full items-center justify-center text-6xl'>{formData.endDate}</div>
                                <div className='flex w-full items-center justify-center text-6xl'>{formData.title}</div>
                                <div className='flex w-full items-center justify-center text-6xl mt-5'>
                                    {formData.file ? (
                                        <div className="relative">
                                            <CustomImage src={isValidUrl(formData.file) ? formData.file : URL.createObjectURL(formData.file)} width={200} height={200} onClick={() => pickFileRef.current.openFilePicker()} />
                                        </div>
                                    ) : (
                                        <BsImage className='text-5xl rounded' />
                                    )}
                                </div>
                                <QRCode value={`${process.env.NEXT_PUBLIC_API}cert/${formData.cert_id}`} size={256} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default General;
