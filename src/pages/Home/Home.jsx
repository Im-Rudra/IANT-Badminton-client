import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Alert, Avatar, Card, Divider } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useRef } from 'react';
import { getItem } from '../Admin/HomePageEditor';

import homeBanner from '../../img/home-banner.jpg';
import Editor from '../../components/Editor/Editor';

const Home = () => {
  const editor = useRef();
  const blocks = getItem();
  // console.log(blocks);
  return (
    <div>
      {/* <div>
        <img className="object-cover" src={homeBanner} alt="home-banner" />
      </div> */}
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
          {/* <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={<span className="text-xl">In memory of our beloved brother Wasim Salam</span>}
            // description=""
          /> */}
          {/* <Divider orientation="center">
            <span className="text-xl sm:text-base font-bold">
              IANT Open Badminton Tournament 2023!
            </span>
          </Divider> */}
          {/* <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center">
            IANT Open Badminton Tournament 2023!
          </h1>
          <Divider />
          <div>
            <p className="font-bold text-lg mb-1">Date & Time</p>
            <p>Day-1: February 11th(2:30 PM - Till we finish). Team reporting at 2:00 PM</p>
            <p>Day-2: February 12th(9.00 AM to 6.00 PM)</p>
            <p>Location: @IANT Multipurpose Hall</p>
            <p className="mb-2">
              Registration deadline: <span className="font-bold">February 5th, 2023</span>
            </p>
            <Alert
              message="Due to conflict with another important event at IANT, our tournament timing will change on Saturday, February 11th, from 2:30 pm till we finish the schedule. Team reporting time will be at 2.00pm."
              type="warning"
            />
          </div>

          <Divider orientation="left">
            <span className="text-base "></span>
          </Divider>
          <div>
            <p className="font-bold text-lg mb-1">Entry Fee</p>
            <p>Single: $30</p>
            <p>Double: $60</p>
            <p>Trophy: 1st, 2nd & 3rd</p>
          </div>
          <Divider />
          <div>
            <p className="font-bold text-lg mb-1">Prize</p>
            <p>(Cash $200 for Single 1st place winner</p>
            <p>Cash $400 for Double 1st place winner)</p>
          </div>
          <Divider />
          <div>
            <p className="font-bold text-lg mb-1">For Assistance</p>
            <p>Manik: 786-999-9006</p>
            <p>Faruk: 214-414-6260</p>
          </div> */}

          <Editor editorRef={editor} readOnly={true} data={blocks} />
        </Card>
      </div>
    </div>
  );
};

export default Home;
