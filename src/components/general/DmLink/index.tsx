import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DmContextMenu from '../DmContextMenu';
import { useTranslation } from 'react-i18next';

interface Props {
  to: string;
  children?: React.ReactNode;
  style?: React.CSSProperties; // Accept menu style prop
}

const DmLink: React.FC<Props> = ({ to, children, style }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const menuItems = [
    {
      label: t('open-in-new-window'),
      onClick: () => window.electron.openNewWindow(to),
    },
  ];

  return (
    <DmContextMenu items={menuItems} style={style}>
      <div onClick={() => navigate(to)}>{children ?? 'N/A'}</div>
    </DmContextMenu>
  );
};

export default DmLink;
