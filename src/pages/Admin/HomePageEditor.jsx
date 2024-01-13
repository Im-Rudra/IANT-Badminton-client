import React, { useRef, useState } from 'react';
import Editor from '../../components/Editor/Editor';
import { Button } from 'antd';
import axios from 'axios';
import { getToken } from '../../utils/utils';
import { toast } from 'react-toastify';

export const setItem = (data) => {
  localStorage.setItem('editorjsData', JSON.stringify(data));
};

export const getItem = () => {
  return JSON.parse(localStorage.getItem('editorjsData'));
};

const HomePageEditor = () => {
  const editorRef = useRef();

  const [initialData, setInitialData] = useState(getItem());
  const [isSaving, setIsSaving] = useState(false);
  const isReadOnly = () => editorRef.current?.readOnly.isEnabled;

  const getEditorData = async () => {
    const blocks = await editorRef.current?.save();
    return blocks;
  };

  const handleSaving = async (editorData) => {
    // console.log(editorRef.current?.readOnly);

    if (editorRef.current?.readOnly.isEnabled) {
      editorRef.current?.readOnly.toggle();
      return;
    }
    setIsSaving(true);
    setItem(editorData);
    console.log(editorData);

    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_ORIGIN + 'save-homepage',
        { id: process.env.REACT_APP_HOMEPAGE_ID, blocks: JSON.stringify(editorData) },
        {
          headers: {
            Authorization: getToken()
          }
        }
      );

      if (response.status === 200) {
        editorRef.current?.readOnly.toggle();
        toast.success('Data saved...');
      }

      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const blocks = await getEditorData();
    console.log(blocks);
    setItem(blocks);
    setIsSaving(false);
  };

  console.log(editorRef.current?.readOnly);

  return (
    <div>
      <h2>Home page Editor</h2>
      <div className="flex justify-end">
        {/* <Button onClick={() => editorRef.current?.readOnly.toggle()}>Toggle</Button> */}
        <Button
          onClick={async () => handleSaving(await getEditorData())}
          type="primary"
          loading={isSaving}
        >
          {isReadOnly() ? 'Edit' : 'Save'}
        </Button>
      </div>
      <Editor editorRef={editorRef} readOnly={false} data={getItem()} />
    </div>
  );
};

export default HomePageEditor;
