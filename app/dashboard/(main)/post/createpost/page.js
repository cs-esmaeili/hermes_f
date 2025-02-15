'use client'
import { useState, useEffect } from 'react';
import ParagraphEditor from './ParagraphEditor';

const Editor = () => {
    // مدل اولیه به صورت JSON (هر بلوک شامل تگ، تراز، جهت و آرایه‌ای از بخش‌های متنی با استایل‌های مختلف)
    const [items, setItems] = useState([
        {
            tag: 'h1',
            align: 'right',
            direction: 'rtl',
            children: [
                { text: 'این یک پاراگراف نمونه است.', bold: false, italic: false, underline: false, link: null }
            ]
        },
        {
            tag: 'h2',
            align: 'right',
            direction: 'rtl',
            children: [
                { text: 'این یک پاراگراف دیگر است.', bold: false, italic: false, underline: false, link: null }
            ]
        }
    ]);

    const handleItemsChange = (updatedBlock, index) => {
        setItems((prevItems) => {
            const newItems = [...prevItems];
            newItems[index] = updatedBlock;
            return newItems;
        });
    };

    useEffect(() => {
        console.log('مدل JSON ویرایش شده:', items);
    }, [items]);

    return (
        <div className="flex flex-col grow overflow-auto items-center bg-primary rounded-xl p-3 gap-3">

      
            {/* {items.map((block, index) => (
                <ParagraphEditor key={index} data={block} index={index} onChange={handleItemsChange} />
            ))} */}
        </div>
    );
};

export default Editor;
