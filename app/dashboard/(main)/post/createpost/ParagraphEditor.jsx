import React, { useState, useRef, useEffect } from 'react';

const ParagraphEditor = ({ data, onChange, index }) => {
  // data شامل: { id, type, content, tag, align, direction } است.
  const [tag, setTag] = useState(data.tag);
  const [content, setContent] = useState(data.content);
  const [align, setAlign] = useState(data.align || "right");
  const [direction, setDirection] = useState(data.direction || "rtl");
  const [openMenu, setOpenMenu] = useState(false);
  const containerRef = useRef(null);
  const textareaRef = useRef(null);

  const handleTagChange = (e) => {
    const newTag = e.target.value;
    setTag(newTag);
    onChange({ ...data, tag: newTag, content, align, direction }, index);
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    onChange({ ...data, tag, content: newContent, align, direction }, index);
  };

  const handleAlignmentChange = (e) => {
    const newAlign = e.target.value;
    setAlign(newAlign);
    onChange({ ...data, tag, content, align: newAlign, direction }, index);
  };

  const handleDirectionChange = (e) => {
    const newDirection = e.target.value;
    setDirection(newDirection);
    onChange({ ...data, tag, content, align, direction: newDirection }, index);
  };

  // دکمه افزودن لینک: پس از انتخاب بخشی از متن، لینک را از کاربر دریافت کرده و به متن اضافه می‌کند.
  const handleInsertLink = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start === end) {
      alert("لطفاً متنی را برای افزودن لینک انتخاب کنید.");
      return;
    }
    const selectedText = content.substring(start, end);
    const url = prompt("لطفاً لینک را وارد کنید:");
    if (url) {
      const linkText = `<a href="${url}" target="_blank" rel="noopener noreferrer">${selectedText}</a>`;
      const newContent = content.substring(0, start) + linkText + content.substring(end);
      setContent(newContent);
      onChange({ ...data, tag, content: newContent, align, direction }, index);
    }
  };

  // بستن منو زمانی که کلیک خارج از کامپوننت انجام می‌شود
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-5 w-full h-fit p-5 rounded-lg bg-red-500"
      style={{ direction: direction }}
    >
      <div className={`hidden ${openMenu && "!block visible"}`}>
        <select
          value={tag}
          onChange={handleTagChange}
          className="ml-2 p-2 rounded border border-gray-600 text-white bg-primary"
        >
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
          <option value="h4">H4</option>
          <option value="p">پاراگراف</option>
        </select>

        {/* منوی تنظیم تراز متن */}
        <select
          value={align}
          onChange={handleAlignmentChange}
          className="ml-2 p-2 rounded border border-gray-600 text-white bg-primary mt-2"
        >
          <option value="left">چپ چین</option>
          <option value="center">وسط چین</option>
          <option value="right">راست چین</option>
        </select>

        {/* منوی تنظیم جهت نوشتن */}
        <select
          value={direction}
          onChange={handleDirectionChange}
          className="ml-2 p-2 rounded border border-gray-600 text-white bg-primary mt-2"
        >
          <option value="ltr">LTR</option>
          <option value="rtl">RTL</option>
        </select>

        {/* دکمه افزودن لینک */}
        <button
          onClick={handleInsertLink}
          className="ml-2 p-2 rounded border border-gray-600 text-white bg-primary mt-2"
        >
          افزودن لینک
        </button>
      </div>

      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleContentChange}
        className="w-full text-textcolor text-base rounded bg-transparent field-sizing-content resize-none overflow-hidden outline-none"
        placeholder="متن خود را وارد کنید..."
        style={{ fieldSizing: "content", textAlign: align }}
        onFocus={() => setOpenMenu(true)}
      />
    </div>
  );
};

export default ParagraphEditor;
