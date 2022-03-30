import Quill from 'quill';
import { ImageResize } from 'quill-image-resize-module-ts';
import React, { useEffect, useRef } from 'react';

interface IQuillProps {
  body: string;
  handleQuillChange: React.Dispatch<React.SetStateAction<string>>;
}

Quill.register('modules/imageResize', ImageResize);

export default function QuillEditor({ body, handleQuillChange }: IQuillProps) {
  const quillElement = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill>();

  useEffect(() => {
    if (quillElement.current && !quillInstance.current) {
      const toolbarOptions = {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ align: [] }],
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction
          ['clean'], // remove formatting button
          ['blockquote', 'link', 'code-block', 'formula', 'image', 'video'], // media
        ],
      };

      quillInstance.current = new Quill(quillElement.current, {
        modules: {
          history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true,
          },
          syntax: false,
          toolbar: toolbarOptions,
          imageResize: {
            modules: ['Resize', 'DisplaySize'],
          },
        },
        placeholder: '본문 입력',
        theme: 'snow',
      });

      const quill = quillInstance.current;
      quill.root.setAttribute('spellcheck', 'false');
      quill.root.innerHTML = body;

      quill.on('text-change', () => {
        handleQuillChange(quill.root.innerHTML);
      });
      if (body !== '') quill.root.innerHTML = body;
    }
  }, [body, handleQuillChange]);

  return (
    <div
      style={{
        width: '1000px',
        height: 'auto',
        minHeight: '300px',
        maxHeight: '1500px',
      }}
    >
      <div
        ref={quillElement}
        style={{
          width: '1000px',
          height: 'auto',
          minHeight: '300px',
        }}
      ></div>
    </div>
  );
}
