import React, { useRef, forwardRef, useImperativeHandle } from 'react';

const PickFile = forwardRef(({ fileSelectListener }, ref) => {
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
        openFilePicker: () => {
            if (inputRef.current) {
                inputRef.current.click();
            }
        }
    }));

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && fileSelectListener) {
            fileSelectListener(file);
        }
    };

    return (
        <input
            ref={inputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
        />
    );
});

export default PickFile;
