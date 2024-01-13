/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useState } from 'react';
import './Editor.css';

const Editor = ({ editorRef, readOnly, data = null }) => {
  if (!editorRef) return <div>editorRef param is not defined</div>;
  const [isMounted, setIsMounted] = useState(false);

  const initializeEditor = useCallback(async () => {
    if (editorRef.current) return;

    const EditorJS = (await import('@editorjs/editorjs')).default;
    const Header = (await import('@editorjs/header')).default;
    const Embed = (await import('@editorjs/embed')).default;
    const Table = (await import('@editorjs/table')).default;
    const NestedList = (await import('@editorjs/nested-list')).default;
    const Checklist = (await import('@editorjs/checklist')).default;
    const Code = (await import('@editorjs/code')).default;
    const LinkTool = (await import('@editorjs/link')).default;
    const InlineCode = (await import('@editorjs/inline-code')).default;
    const Delimiter = (await import('@editorjs/delimiter')).default;

    const editor = new EditorJS({
      holder: 'editorjs',
      data: data,
      placeholder: 'Type here...',
      autofocus: readOnly ? !readOnly : true,
      inlineToolbar: true,
      readOnly: readOnly ? readOnly : false,
      onReady: () => {
        editorRef.current = editor;
      },
      tools: {
        header: {
          class: Header,
          inlineToolbar: true
        },
        linkTool: LinkTool,
        list: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: 'ordered'
          }
        },
        delimiter: Delimiter,
        checklist: {
          class: Checklist,
          inlineToolbar: true
        },
        code: Code,
        inlineCode: {
          class: InlineCode,
          config: {}
        },
        table: {
          class: Table,
          inlineToolbar: true
        },
        embed: Embed
      }
    });
  }, [readOnly]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        editorRef.current?.destroy();
        editorRef.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  return (
    <div
      id="editorjs"
      className="prohibit-tailwind prose prose-li:mb-0 prose-li:mt-0 prose-code:before:content-none prose-code:after:content-none prose-code:font-[inherit] min-w-full max-w-auto !w-full mx-auto md:px-8"
    />
  );
};

export default Editor;
