import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import Editor from '../../components/Editor/Editor';
import homeBanner from '../../img/home-banner.jpg';
import { getToken } from '../../utils/utils';

const Home = () => {
  const editor = useRef();
  const [homepageData, setHomepageData] = useState(null);

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
      <div className="px-4">
        <Card
          style={{
            width: '100%'
          }}
          cover={<img alt="example" src={homeBanner} />}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />
          ]}
        >
          {!homepageData ? (
            <p className="text-center text-3xl font-semibold py-8">loading...</p>
          ) : (
            <Editor editorRef={editor} readOnly={true} data={JSON.parse(homepageData?.blocks)} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Home;
