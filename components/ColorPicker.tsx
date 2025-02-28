"use client";
import { useState, useRef, useEffect } from 'react';
import { Box, Button } from '@mui/material';

interface ColorPickerProps {
  initialColor: string;
  onSelectColor: (color: string) => void;
  onClose: () => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  initialColor,
  onSelectColor,
  onClose,
}) => {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const pickerRef = useRef<HTMLDivElement>(null);

  const predefinedColors = [
    '#FF6B6B', '#FF8E8E', '#FFB8B8', 
    '#4ECDC4', '#83E4DF', '#B0F0EC', 
    '#F9DC5C', '#FBE78A', '#FDF1B8',
    '#7158E2', '#9785EA', '#BDB5F1', 
    '#3581B8', '#6AA3CB', '#9FC5DE',
    '#FF7A5A', '#FF9B83', '#FFBDAD', 
    '#9BC53D', '#B5D56A', '#D0E59A', 
    '#5F6CAF', '#858DCB', '#ACB1E1', 
    '#444444', '#777777', '#AAAAAA', 
    '#000000', '#333333', '#666666'  
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleColorSelect = (color: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedColor(color);
    onSelectColor(color);
    setTimeout(() => onClose(), 100); 
  };

  return (
    <Box 
      ref={pickerRef}
      sx={{
        position: 'absolute',
        bgcolor: 'background.paper',
        p: 2,
        borderRadius: 1,
        boxShadow: 3,
        zIndex: 10,
        border: '1px solid',
        borderColor: 'divider',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1 }}>
        {predefinedColors.map((color, index) => (
          <Button
            key={index}
            sx={{
              width: 32,
              height: 32,
              minWidth: 32,
              borderRadius: "50%",
              backgroundColor: color,
              border: selectedColor === color ? "2px solid black" : "1px solid",
              borderColor: selectedColor === color ? "black" : "divider",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
            onClick={(event) => handleColorSelect(color, event)}
            aria-label={`Select color ${color}`}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ColorPicker;