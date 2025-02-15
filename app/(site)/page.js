'use client'
// App.js
import React, { useRef, useEffect } from 'react';

// کامپوننت‌های نمونه برای متن تو در تو
const BoldText = ({ children }) => (
  <strong style={{ color: 'red' }}>{children}</strong>
);
const ItalicText = ({ children }) => (
  <em style={{ color: 'blue' }}>{children}</em>
);

// کامپوننت NestedText با متن تو در تو
const NestedText = () => (
  <div style={{ lineHeight: '1.6', fontSize: '18px' }}>
    این یک متن نمونه است. برای مثال، <BoldText>این متن بولد است</BoldText> و همچنین{' '}
    <ItalicText>این متن ایتالیک است</ItalicText>. شما می‌توانید در هر نقطه‌ای تایپ کنید.
  </div>
);

const App = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (
        selection &&
        selection.rangeCount > 0 &&
        selection.toString().trim() !== ''
      ) {
        const range = selection.getRangeAt(0);
        // بررسی می‌کنیم که انتخاب درون container ما انجام شده باشد
        if (
          containerRef.current &&
          containerRef.current.contains(range.commonAncestorContainer)
        ) {
          console.clear();
          console.log('متن انتخاب شده یا موقعیت caret:', selection.toString());
          console.log('Start container:', range.startContainer);
          console.log('Start offset:', range.startOffset);
          console.log('End container:', range.endContainer);
          console.log('End offset:', range.endOffset);
          console.log('Common ancestor:', range.commonAncestorContainer);
        }
      }
    };

    // اضافه کردن رویداد global به document
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      // contentEditable={true}
      style={{
        padding: '20px',
        border: '1px solid #ccc',
        margin: '20px',
        borderRadius: '8px',
        direction: 'rtl',
        backgroundColor: '#f9f9f9',
      }}
    >
      <NestedText />
    </div>
  );
};

export default App;
