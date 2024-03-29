import React, { useEffect, useRef, useState } from 'react';
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
  const [isSaving, setIsSaving] = useState(false);
  const isReadOnly = () => editorRef.current?.readOnly.isEnabled;
  const [homepageData, setHomepageData] = useState(null);

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

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_ORIGIN + 'homepage', {
        headers: {
          Authorization: getToken()
        }
      })
      .then((data) => {
        console.log(data.data);
        setHomepageData(data.data[0]);
      })
      .catch((error) => console.error(error));
  }, []);

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
      {!homepageData ? (
        <p className="text-center text-3xl font-semibold py-8">loading...</p>
      ) : (
        <Editor editorRef={editorRef} readOnly={false} data={JSON.parse(homepageData?.blocks)} />
      )}
    </div>
  );
};

export default HomePageEditor;
