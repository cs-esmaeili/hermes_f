import React, { useState, useEffect, useRef } from 'react';

const generateCaptcha = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

const Captcha = ({ setCaptchaCode = null, backgroundColor = "#000000" }) => {
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const resizeCanvas = () => {
            const container = containerRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            // تنظیم ابعاد بوم به اندازه والد
            const width = container.offsetWidth;
            const height = container.offsetHeight;
            canvas.width = width;
            canvas.height = height;
            ctx.clearRect(0, 0, width, height);

            // رنگ پس‌زمینه
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, width, height);

            // رسم دایره‌های رنگی به عنوان نویز
            for (let i = 0; i < 20; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const radius = Math.random() * 10 + 5;
                ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            }

            // تنظیم فونت و رسم کپچا
            const fontSize = Math.min(width, height) / 2;
            ctx.font = `${fontSize}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#FFF";
            ctx.fillText(captcha, width / 2, height / 2);
        };
        setCaptchaCode(captcha);
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        return () => window.removeEventListener("resize", resizeCanvas);
    }, [captcha, backgroundColor]);

    const refreshCaptcha = () => {
        setCaptcha(generateCaptcha());
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full  flex items-center justify-center rounded-md overflow-hidden"
            onClick={refreshCaptcha}
        >
            <canvas ref={canvasRef} className="w-full h-full cursor-pointer"></canvas>
        </div>
    );
};

export default Captcha;
