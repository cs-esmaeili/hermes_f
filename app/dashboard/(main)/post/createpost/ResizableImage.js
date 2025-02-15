// ResizableImage.js
import { Node, mergeAttributes } from '@tiptap/core';

const ResizableImage = Node.create({
  name: 'resizableImage',
  group: 'block',
  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      width: { default: '300px' },
      height: { default: '200px' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[data-type="resizable-image"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'img',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'resizable-image',
        style: `display: block; width: ${HTMLAttributes.width}; height: ${HTMLAttributes.height};`,
      }),
    ];
  },

  addCommands() {
    return {
      setImage: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        });
      },
    };
  },

  addNodeView() {
    return ({ node, editor, HTMLAttributes }) => {
      // ایجاد container به صورت flex برای وسط چین کردن
      const container = document.createElement('div');
      container.style.position = 'relative';
      container.style.display = 'flex';
      container.style.justifyContent = 'center';
      container.style.alignItems = 'center';
      container.style.width = '100%'; // یا به اندازه‌ای که مد نظرتان است

      // ایجاد عنصر تصویر
      const img = document.createElement('img');
      img.src = HTMLAttributes.src;
      img.style.width = HTMLAttributes.width;
      img.style.height = HTMLAttributes.height;
      img.style.display = 'block';
      container.appendChild(img);

      // ایجاد هندل تغییر اندازه (گوشه پایین راست)
      const resizer = document.createElement('div');
      resizer.style.position = 'absolute';
      // تنظیم موقعیت resizer نسبت به container
      resizer.style.right = 'calc(50% - ' + (parseInt(HTMLAttributes.width) / 2 - 5) + 'px)';
      resizer.style.bottom = 'calc(50% - ' + (parseInt(HTMLAttributes.height) / 2 - 5) + 'px)';
      resizer.style.width = '10px';
      resizer.style.height = '10px';
      resizer.style.background = 'blue';
      resizer.style.cursor = 'nwse-resize';
      container.appendChild(resizer);

      let startX, startWidth, aspectRatio;

      const onMouseDown = (event) => {
        event.preventDefault();
        startX = event.clientX;
        startWidth = img.offsetWidth;
        aspectRatio = img.offsetWidth / img.offsetHeight;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      };

      const onMouseMove = (event) => {
        const dx = event.clientX - startX;
        const newWidth = startWidth + dx;
        const newHeight = newWidth / aspectRatio;
        img.style.width = newWidth + 'px';
        img.style.height = newHeight + 'px';
        // به‌روزرسانی موقعیت resizer:
        resizer.style.right = 'calc(50% - ' + (newWidth / 2 - 5) + 'px)';
        resizer.style.bottom = 'calc(50% - ' + (newHeight / 2 - 5) + 'px)';
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        editor.chain().focus().updateAttributes('resizableImage', {
          width: img.style.width,
          height: img.style.height,
        }).run();
      };

      resizer.addEventListener('mousedown', onMouseDown);

      return {
        dom: container,
        contentDOM: null,
        update(updatedNode) {
          return updatedNode.type === node.type;
        },
        destroy() {
          resizer.removeEventListener('mousedown', onMouseDown);
        },
      };
    };
  },
});

export default ResizableImage;
