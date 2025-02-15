import Strong from '@/app/(site)/Strong';
import { useMemo } from 'react';

const useTransformedContent = (contentStr) => {
    return useMemo(() => {
        // الگوی regex برای یافتن placeholder به صورت ["{ ... }"]
        const regex = /\[\s*"([^"]+)"\s*\]/g;
        const result = [];
        let lastIndex = 0;
        let match;
        let key = 0;

        while ((match = regex.exec(contentStr)) !== null) {
            // اضافه کردن متن قبل از placeholder
            if (match.index > lastIndex) {
                result.push(contentStr.slice(lastIndex, match.index));
            }

            const placeholderStr = match[1]; // رشته داخل کوتیشن‌ها
            // تبدیل تک‌نقل قول‌ها به دوتایی و اضافه کردن نقل قول به کلیدها
            let jsonStr = placeholderStr
                .replace(/'/g, '"')
                .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');

            let obj = null;
            try {
                obj = JSON.parse(jsonStr);
            } catch (e) {
                console.error("Parsing error for placeholder:", placeholderStr, e);
            }

            if (obj) {

                if (obj.tag == "strong") {
                    result.push(
                        <Strong key={key++} data={obj} />
                    );

                }
                // ساخت کامپوننت بر اساس مشخصات آبجکت
                // const ComponentTag = obj.tag || 'div';
                // result.push(
                //     <ComponentTag key={key++} className={obj.className}>
                //         {obj.content}
                //     </ComponentTag>
                // );


            } else {
                // در صورت خطا، متن اصلی placeholder نمایش داده شود
                result.push(match[0]);
            }

            lastIndex = regex.lastIndex;
        }

        // اضافه کردن بخش باقی‌مانده از رشته
        if (lastIndex < contentStr.length) {
            result.push(contentStr.slice(lastIndex));
        }

        return result;
    }, [contentStr]);
};

export default useTransformedContent;
