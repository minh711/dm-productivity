import React from 'react';
import { Button, Result } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { HOME_PATH } from '../../constants';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            icon={<HomeOutlined />}
            onClick={() => navigate(HOME_PATH)}
          >
            Back to Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
