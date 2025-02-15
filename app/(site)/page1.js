'use client'
import { useState, useEffect } from 'react';
import ParagraphEditor from './ParagraphEditor';

const Editor = () => {
    const [items, setItems] = useState([
        {
            tag: 'div',
            className: 'border-2 w-full rtl',
            // content: "this is test"
            content: "this [\"{ tag: 'strong', className: ' w-full rtl bg-red-300', content: 'this is test'}\"] test"
        }
    ]);

    const handleItemsChange = (updatedBlock, index) => {
        setItems(prevItems => {
            const newItems = [...prevItems];
            newItems[index] = updatedBlock;
            return newItems;
        });
    };

    useEffect(() => {
        console.log('Updated JSON:', items);
    }, [items]);

    return (
        <div className="flex flex-col grow overflow-auto items-center bg-primary rounded-xl p-3 gap-3">
            {items.map((block, index) => {

                if (block.tag == "div") {
                    return (
                        <ParagraphEditor
                            key={index}
                            data={block}
                            index={index}
                            onChange={handleItemsChange}
                        />
                    )
                }

            })}
        </div>
    );
};

export default Editor;
