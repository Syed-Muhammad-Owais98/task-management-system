"use client";
import { useState, useEffect, useRef } from "react";
import { Box, TextField, Button, IconButton, Typography } from "@mui/material";
import TagPill from "@/components/TagPill";
import ColorPicker from "@/components/ColorPicker";
import { Tag } from "@/types";
import DeleteIcon from "@mui/icons-material/Delete";
import ColorLensIcon from "@mui/icons-material/ColorLens";

interface TagModalProps {
  tags: Tag[];
  selectedTagIds: string[];
  onClose: () => void;
  onSave: (selectedTagIds: string[]) => void;
  onTagsUpdate: (tags: Tag[]) => void;
}

const TagModal: React.FC<TagModalProps> = ({
  tags,
  selectedTagIds,
  onClose,
  onSave,
  onTagsUpdate,
}) => {
  const [localTags, setLocalTags] = useState<Tag[]>(tags);
  const [selected, setSelected] = useState<string[]>(selectedTagIds);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [colorPickerTagId, setColorPickerTagId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const toggleTag = (tagId: string) => {
    setSelected((prev) => {
      const newSelected = prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId];

      onSave(newSelected); 
      return newSelected;
    });
  };

  const handleSave = () => {
    onSave(selected);
    onTagsUpdate(localTags); 
    onClose();
  };

  const createNewTag = () => {
    if (!searchQuery.trim()) return;

    const newTag: Tag = {
      id: `tag-${Date.now()}`,
      name: searchQuery.trim(),
      color: getRandomColor(), 
    };

    setLocalTags((prev) => {
      const updatedTags = [...prev, newTag];
      onTagsUpdate(updatedTags); 
      return updatedTags;
    });

    setSelected((prev) => [...prev, newTag.id]); 
    setSearchQuery(""); 
  };

  const deleteTag = (tagId: string) => {
    setLocalTags((prev) => prev.filter((tag) => tag.id !== tagId));
    setSelected((prev) => prev.filter((id) => id !== tagId));
  };

  const renameTag = (tagId: string, newName: string) => {
    if (!newName.trim()) return;

    setLocalTags((prev) =>
      prev.map((tag) =>
        tag.id === tagId ? { ...tag, name: newName.trim() } : tag
      )
    );
    setEditingTag(null);
  };

  const openColorPicker = (tag: Tag) => {
    setEditingTag(tag);
    setColorPickerTagId(tag.id);
    setIsColorPickerOpen(true);
  };

  const changeTagColor = (tagId: string, newColor: string) => {
    setLocalTags((prev) =>
      prev.map((tag) => (tag.id === tagId ? { ...tag, color: newColor } : tag))
    );
  };

  const closeColorPicker = () => {
    setIsColorPickerOpen(false);
    setColorPickerTagId(null);
    setEditingTag(null); 
  };

  const filteredTags = localTags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
        width: 400,
        maxHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
          mb: 2,
          borderRadius: "8px",
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "8px",
            pointerEvents: "none", // Ensure clicks pass through to the TextField
          },
          "&::before": {
            border: "4px solid",
            borderColor: "rgba(130, 128, 255, 0.3)", // Light opacity outer border
          },
          "&::after": {
            border: "2px solid",
            borderColor: "rgba(130, 128, 255, 0.8)", // Dark opacity inner border
            top: "2px",
            left: "2px",
            right: "2px",
            bottom: "2px",
          },
        }}
      >
        <TextField
          inputRef={inputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Type to pick or create tag..."
          fullWidth
          variant="outlined"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              createNewTag();
            }
          }}
          sx={{
            position: "relative", 
            zIndex: 1, 
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "transparent", 
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent", 
              },
            },
            "& .MuiOutlinedInput-input": {
              padding: "6.5px 10px",
            },
          }}
        />
      </Box>

      <Typography variant="subtitle1" sx={{ color: "text.secondary", mb: 1 }}>
        Recent
      </Typography>

      <Box sx={{ overflowY: "auto", maxHeight: "50vh", mb: 2 }}>
        {filteredTags.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {filteredTags.map((tag) => (
              <Box
                key={tag.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
                >
                  {editingTag?.id === tag.id && !isColorPickerOpen ? (
                    <Box
                    sx={{
                      position: "relative",
                      mb: 2,
                      borderRadius: "8px",
                      "&::before, &::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: "8px",
                        pointerEvents: "none", 
                      },
                      "&::before": {
                        border: "4px solid",
                        borderColor: "rgba(130, 128, 255, 0.3)", 
                      },
                      "&::after": {
                        border: "2px solid",
                        borderColor: "rgba(130, 128, 255, 0.8)",
                        top: "2px",
                        left: "2px",
                        right: "2px",
                        bottom: "2px",
                      },
                    }}
                  >
                    <TextField
                    inputRef={inputRef}
                    value={editingTag.name}
                    onChange={(e) =>
                      setEditingTag({ ...editingTag, name: e.target.value })
                    }
                    onBlur={() => renameTag(tag.id, editingTag.name)}
                    placeholder="Type to pick or create tag..."
                    fullWidth
                    variant="outlined"
                    onKeyDown={(e) => {
                      if (e.key === "Enter")
                        renameTag(tag.id, editingTag.name);
                      if (e.key === "Escape") setEditingTag(null);
                    }}
                    autoFocus
                    sx={{
                      mr: 1 ,
                      position: "relative", 
                      zIndex: 1,
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "transparent", 
                        },
                        "&:hover fieldset": {
                          borderColor: "transparent",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "transparent", 
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        padding: "6.5px 10px",
                      },
                    }}
                  />
                  </Box>
                  ) : (
                    <TagPill
                      tag={tag}
                      onClick={() => toggleTag(tag.id)}
                      selected={selected.includes(tag.id)}
                    />
                  )}
                </Box>
                <Box sx={{ display: "flex" }}>
                  <IconButton
                    onClick={() => setEditingTag(tag)}
                    size="small"
                    aria-label="Rename tag"
                  >
                    <img
                      src="/editIcon.png"
                      alt="Edit"
                      style={{ width: 20, height: 20 }}
                    />
                  </IconButton>
                  <IconButton
                    onClick={() => openColorPicker(tag)}
                    size="small"
                    aria-label="Change tag color"
                  >
                    <ColorLensIcon
                      fontSize="small"
                      style={{ color: "#A9A9A9" }}
                    />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteTag(tag.id)}
                    size="small"
                    aria-label="Delete tag"
                  >
                    <DeleteIcon fontSize="small" style={{ color: "#A9A9A9" }} />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        ) : searchQuery ? (
          <Typography
            variant="body2"
            sx={{ textAlign: "center", py: 2, color: "text.secondary" }}
          >
            No tags found. Press Enter to create "{searchQuery}"
          </Typography>
        ) : (
          <Typography
            variant="body2"
            sx={{ textAlign: "center", py: 2, color: "text.secondary" }}
          >
            No tags found
          </Typography>
        )}
      </Box>

      {isColorPickerOpen && colorPickerTagId && (
        <ColorPicker
          initialColor={
            localTags.find((tag) => tag.id === colorPickerTagId)?.color ||
            "#FF6B6B"
          }
          onSelectColor={(color) => {
            changeTagColor(colorPickerTagId, color);
          }}
          onClose={closeColorPicker}
        />
      )}

      <Box sx={{ display: "flex", width: "100%", gap: 1, mt: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ width: "100%", bgcolor: "white", color: "#8280FF" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{ width: "100%", color: "white", bgcolor: "#8280FF" }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

const getRandomColor = (): string => {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#F9DC5C",
    "#7158E2",
    "#3581B8",
    "#FFAE03",
    "#FB8B24",
    "#E36414",
    "#9BC53D",
    "#5BC0EB",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default TagModal;
