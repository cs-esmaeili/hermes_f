// components/MyEditor.js
import React, { useState } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

const buttonStyle = "bg-primary p-3 rounded-lg text-textcolor";
const activeButtonStyle = "bg-primary p-3 rounded-lg text-textcolor text-purple-500";

const Toolbar = ({
    editor,
    isEditingLink,
    setIsEditingLink,
    linkUrl,
    setLinkUrl,
    applyLink,
    removeLink,
}) => {
    const [highlightColor, setHighlightColor] = useState('#FFFF00'); // رنگ پیش‌فرض زرد

    if (!editor) return null;

    return (
        <div className='flex flex-wrap gap-3 mb-3'>
            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? activeButtonStyle : buttonStyle}
            >
                Paragraph
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? activeButtonStyle : buttonStyle}
            >
                H1
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? activeButtonStyle : buttonStyle}
            >
                H2
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive('heading', { level: 3 }) ? activeButtonStyle : buttonStyle}
            >
                H3
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? activeButtonStyle : buttonStyle}
            >
                Bold
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? activeButtonStyle : buttonStyle}
            >
                Italic
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? activeButtonStyle : buttonStyle}
            >
                Strike
            </button>
            {/* Highlight */}
            <label
                className={editor.isActive('highlight') ? activeButtonStyle : buttonStyle}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                }}
            >
                Highlight
                <input
                    type="color"
                    value={highlightColor}
                    onChange={(e) => {
                        const newColor = e.target.value;
                        setHighlightColor(newColor);
                        editor.chain().focus().toggleHighlight({ color: newColor }).run();
                    }}
                    style={{
                        border: 'none',
                        padding: 0,
                        margin: 0,
                        width: '32px',
                        height: '32px',
                        background: 'transparent',
                        cursor: 'pointer',
                    }}
                />
            </label>
            <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={editor.isActive({ textAlign: 'left' }) ? activeButtonStyle : buttonStyle}
            >
                Left
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={editor.isActive({ textAlign: 'center' }) ? activeButtonStyle : buttonStyle}
            >
                Center
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={editor.isActive({ textAlign: 'right' }) ? activeButtonStyle : buttonStyle}
            >
                Right
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                className={editor.isActive({ textAlign: 'justify' }) ? activeButtonStyle : buttonStyle}
            >
                Justify
            </button>
            {/* دکمه Link */}
            <div className={`flex rounded-lg ${isEditingLink && "bg-blue-500 p-1"}`}>
                {isEditingLink ? (
                    <div className="flex gap-2 grow">
                        <button
                            onClick={removeLink}
                            className={buttonStyle}
                        >
                            Remove
                        </button>
                        <button
                            onClick={applyLink}
                            className={buttonStyle}
                        >
                            Apply
                        </button>
                        <input
                            type="text"
                            placeholder="URL لینک"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            className="bg-primary p-3 rounded-lg text-textcolor outline-none"
                            style={{ width: '200px' }}
                        />
                    </div>
                ) : (
                    <button
                        onClick={() => {
                            const currentLink = editor.getAttributes('link').href;
                            if (currentLink) {
                                setLinkUrl(currentLink);
                            }
                            setIsEditingLink(true);
                        }}
                        className={editor.isActive('link') ? activeButtonStyle : buttonStyle}
                    >
                        Link
                    </button>
                )}
            </div>
            {/* دکمه Image: استفاده از URL پیش‌فرض */}
            <button
                onClick={() => {
                    // استفاده از URL پیش‌فرض برای عکس
                    const defaultImageUrl = "https://picsum.photos/200/300";
                    editor.chain().focus().setImage({ src: defaultImageUrl }).run();
                }}
                className={buttonStyle}
            >
                Image
            </button>
        </div>
    );
};

const MyEditor = () => {
    const [isEditingLink, setIsEditingLink] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const editor = useEditor({
        extensions: [
            StarterKit,
            Heading.configure({ levels: [1, 2, 3] }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Highlight.configure({ multicolor: true }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    style: 'color: #4b7de2;',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    style: 'display: block; margin: 0 auto;',
                },
            }),
        ],
        editorProps: {
            attributes: {
                class: 'tiptap ProseMirror custom-editor',
                style: 'border: none; outline: none; padding-right:8px;',
            },
        },
        content: `<p dir="rtl">این یک متن نمونه به زبان فارسی است. متن خود را ویرایش کنید.</p>`,
    });

    const applyLink = () => {
        if (linkUrl.trim() !== '') {
            editor.chain().focus().setLink({ href: linkUrl }).run();
        } else {
            editor.chain().focus().unsetLink().run();
        }
        setIsEditingLink(false);
        setLinkUrl('');
    };

    const removeLink = () => {
        editor.chain().focus().unsetLink().run();
        setIsEditingLink(false);
        setLinkUrl('');
    };

    const handleEditorClick = (e) => {
        if (e.target.tagName === 'A') {
            const currentHref = e.target.getAttribute('href');
            setLinkUrl(currentHref);
            setIsEditingLink(true);
        }
    };

    return (
        <div className='rtl p-2'>
            <Toolbar
                editor={editor}
                isEditingLink={isEditingLink}
                setIsEditingLink={setIsEditingLink}
                linkUrl={linkUrl}
                setLinkUrl={setLinkUrl}
                applyLink={applyLink}
                removeLink={removeLink}
            />
            <div onClick={handleEditorClick}>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default MyEditor;
