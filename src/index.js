import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import AuthProvider from './contexts/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <ConfigProvider
      theme={{
        token: {}
      }}
    >
      <StyleProvider hashPriority="high">
        <App />
      </StyleProvider>
    </ConfigProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
