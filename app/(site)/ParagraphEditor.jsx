import React, { useState, useRef } from 'react';
import useTransformedContent from '@/hooks/editor/useTransformedContent';

const ParagraphEditor = ({ data, onChange, index }) => {
  const [content, setContent] = useState(data.content || '');
  const Tag = data.tag || 'div';
  const className = data.className || '';
  const editorRef = useRef(null);

  // استفاده از هوک برای پردازش content
  const transformedContent = useTransformedContent(content);

  const handleContentChange = (e) => {
    const newContent = e.currentTarget.innerHTML;
    setContent(newContent);
    onChange({ ...data, content: newContent }, index);
  };

  return (
    <div className="paragraph-editor w-full">
      <Tag
        ref={editorRef}
        contentEditable={true}
        onChange={handleContentChange}
        className={className}
        suppressContentEditableWarning={true}
        dir="rtl"
        lang="ar"
      >
        {transformedContent}
      </Tag>
    </div>
  );
};

export default ParagraphEditor;

