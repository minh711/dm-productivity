import React, { useState } from 'react';
import { ColorPicker, ColorPickerProps, Divider, Row, Col, theme } from 'antd';
import { cyan, generate, green, presetPalettes, red } from '@ant-design/colors';

type Presets = Required<ColorPickerProps>['presets'][number];

function genPresets(presets = presetPalettes) {
  return Object.entries(presets).map<Presets>(([label, colors]) => ({
    label,
    colors,
    key: label,
  }));
}

interface DmColorPickerProps {
  style?: React.CSSProperties;
  value?: string;
  onChange?: (color: string) => void;
}

const DmColorPicker: React.FC<DmColorPickerProps> = ({
  style,
  value,
  onChange,
}) => {
  const { token } = theme.useToken();
  const [selectedColor, setSelectedColor] = useState(value || '#FFFFFF');

  const presets = genPresets({
    primary: generate(token.colorPrimary),
    red,
    green,
    cyan,
  });

  const handleColorChange: ColorPickerProps['onChange'] = (color) => {
    const hexColor = color.toHexString(); // Convert color to hex string
    setSelectedColor(hexColor);
    if (onChange) {
      onChange(hexColor);
    }
  };

  const customPanelRender: ColorPickerProps['panelRender'] = (
    _,
    { components: { Picker, Presets } }
  ) => (
    <Row justify="space-between" wrap={false}>
      <Col span={12}>
        <Presets />
      </Col>
      <Divider type="vertical" style={{ height: 'auto' }} />
      <Col flex="auto">
        <Picker />
      </Col>
    </Row>
  );

  return (
    <ColorPicker
      value={selectedColor}
      onChange={handleColorChange}
      styles={{ popupOverlayInner: { width: 480 } }}
      presets={presets}
      panelRender={customPanelRender}
      style={style}
    />
  );
};

export default DmColorPicker;
