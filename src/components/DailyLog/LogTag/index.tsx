import React from 'react';

interface Props {
  item: any;
}

const LogTag: React.FC<Props> = ({ item }) => {
  return (
    <div>
      <div
        style={{
          padding: '0px 16px',
          height: 24,
          borderRadius: '16px',
          color: '#fff',
          backgroundColor: item.color,
          cursor: 'pointer',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {item.name}
      </div>
    </div>
  );
};

export default LogTag;
