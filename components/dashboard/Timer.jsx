import React, { useState, useEffect } from 'react';

function CountdownTimer({ initialTime, onTimerEnd }) {
    // تبدیل رشته زمان (hh:mm:ss) به تعداد ثانیه‌ها
    const parseTimeStringToSeconds = (timeStr) => {
        const [hours, minutes, seconds] = timeStr.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    };

    const [timeLeft, setTimeLeft] = useState(parseTimeStringToSeconds(initialTime));

    useEffect(() => {
        // اگر زمان به پایان رسیده باشد، listener را فراخوانی می‌کنیم
        if (timeLeft <= 0) {
            onTimerEnd && onTimerEnd();
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(intervalId);
                    onTimerEnd && onTimerEnd();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft, onTimerEnd]);

    // تبدیل تعداد ثانیه‌ها به فرمت hh:mm:ss
    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return <p>{formatTime(timeLeft)}</p>;
}

export default CountdownTimer;
