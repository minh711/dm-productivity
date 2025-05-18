import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    setSelectedColor(value || '#FFFFFF');
  }, [value]);

  const presets = [
    {
      label: 'Preset colors',
      key: 'flat',
      colors: [
        // 1. Reds
        '#ff4d4f',
        '#ff7875',
        '#d32029',
        '#a8071a',
        // 2. Oranges
        '#fa8c16',
        '#ffa940',
        '#d46b08',
        '#ad4e00',
        // 3. Yellows
        '#fadb14',
        '#ffec3d',
        '#d4b106',
        '#ad8b00',
        // 4. Greens
        '#52c41a',
        '#73d13d',
        '#389e0d',
        '#237804',
        // 5. Limes
        '#a0d911',
        '#bae637',
        '#7cb305',
        '#5b8c00',
        // 6. Cyans
        '#13c2c2',
        '#36cfc9',
        '#08979c',
        '#006d75',
        // 7. Blues
        '#1677ff',
        '#69b1ff',
        '#0958d9',
        '#003eb3',
        // 8. Light Blues
        '#40a9ff',
        '#91caff',
        '#1d39c4',
        '#10239e',
        // 9. Purples
        '#722ed1',
        '#9254de',
        '#531dab',
        '#391085',
        // 10. Magentas
        '#eb2f96',
        '#ff85c0',
        '#c41d7f',
        '#9e1068',
        // 11. Teals
        '#5cdbd3',
        '#13a8a8',
        '#0e5a5a',
        '#004d4d',
        // 12. Cool Grays
        '#595959',
        '#8c8c8c',
        '#434343',
        '#262626',
        // 13. Warm Grays
        '#bfbfbf',
        '#d9d9d9',
        '#a6a6a6',
        '#969696',
        // 14. Earthy Tones
        '#614700',
        '#873800',
        '#ad6800',
        '#d48806',
        // 15. Darks
        '#1f1f1f',
        '#141414',
        '#000000',
        '#3f3f3f',
        // 16. Extras (high-contrast useful tones)
        '#003a8c',
        '#1d1d1d',
        '#7c3aed',
        '#2f54eb',
      ],
    },
  ];

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
      styles={{ popupOverlayInner: { width: 540 } }}
      presets={presets}
      panelRender={customPanelRender}
      style={style}
    />
  );
};

export default DmColorPicker;
