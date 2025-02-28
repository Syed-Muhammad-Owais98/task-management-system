"use client";
import { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import TagsComponent from './TagsComponent';
import { Tag } from '../types';

const TaskManager: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([
    { id: 'tag-1', name: 'Looong tag name', color: '#FF6B6B' },
    { id: 'tag-2', name: 'Name', color: '#4ECDC4' },
    { id: 'tag-3', name: 'Some name', color: '#F9DC5C' }
  ]);

  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(['tag-1', 'tag-2', 'tag-3']);

  const handleTagsChange = (newSelectedIds: string[]) => {
    setSelectedTagIds(newSelectedIds);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 'md', mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Task Management System
      </Typography>
      
      <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, p: 2, mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Task Details
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField 
            label="Task Name"
            placeholder="Enter task name"
            fullWidth
          />
          
          <TagsComponent 
            initialTags={tags}
            selectedTags={selectedTagIds}
            onTagsChange={handleTagsChange}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TaskManager;