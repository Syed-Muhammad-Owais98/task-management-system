"use client";
import { Tag } from '@/types';
import { Box } from '@mui/material';

interface TagPillProps {
  tag: Tag;
  onClick?: () => void;
  selected?: boolean;
}

const TagPill: React.FC<TagPillProps> = ({ 
  tag, 
  onClick,
  selected = false
}) => {
  return (
    <Box 
      onClick={onClick}
      sx={{
        px: 1.5,
        py: 0.5,
        borderRadius: 1,
        fontSize: '0.875rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: onClick ? 'pointer' : 'default',
        backgroundColor: getTransparentColor(tag.color, 0.16), // 16% opacity
        color: tag.color, // Text color same as tag color
        fontWeight: 600,
        textTransform: 'capitalize',
        '&:hover': {
          opacity: 0.8,
        },
      }}
    >
      {tag.name}
    </Box>
  );
};

// Function to convert hex to rgba with custom opacity
const getTransparentColor = (hexColor: string, opacity: number): string => {
  hexColor = hexColor.replace('#', '');
  let r = parseInt(hexColor.substring(0, 2), 16);
  let g = parseInt(hexColor.substring(2, 4), 16);
  let b = parseInt(hexColor.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default TagPill;
