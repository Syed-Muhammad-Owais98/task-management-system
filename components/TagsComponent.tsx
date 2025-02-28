"use client";
import { useState, useRef } from "react";
import { Box, IconButton, Typography, Popover } from "@mui/material";
import TagPill from "@/components/TagPill";
import TagModal from "@/components/TagModal";
import { Tag } from "@/types";
import EditIcon from "@mui/icons-material/Edit";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

interface TagsComponentProps {
  initialTags?: Tag[];
  selectedTags?: string[];
  onTagsChange?: (selectedTagIds: string[]) => void;
}

const TagsComponent: React.FC<TagsComponentProps> = ({
  initialTags = [],
  selectedTags = [],
  onTagsChange = () => {},
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [selected, setSelected] = useState<string[]>(selectedTags);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleTagsChange = (newSelectedIds: string[]) => {
    setSelected(newSelectedIds);
    onTagsChange(newSelectedIds);
  };

  const handleTagsUpdate = (updatedTags: Tag[]) => {
    setTags([...updatedTags]);
  };

  const selectedTagObjects = tags.filter((tag) => selected.includes(tag.id));

  const handlePopoverOpen = () => {
    setIsPopoverOpen(true);
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <LocalOfferIcon fontSize="small" />

        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          Tags
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {selectedTagObjects.map((tag) => (
            <TagPill key={tag.id} tag={tag} />
          ))}
          <IconButton
            ref={anchorRef}
            onClick={handlePopoverOpen}
            size="small"
            aria-label="Edit tags"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Popover
        open={isPopoverOpen}
        anchorEl={anchorRef.current}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          mt: 1,
          "& .MuiPaper-root": {
            borderRadius: 2,
            boxShadow: 3,
            width: 400,
            maxHeight: "80vh",
            overflow: "hidden",
          },
        }}
      >
        <TagModal
          tags={tags}
          selectedTagIds={selected}
          onClose={handlePopoverClose}
          onSave={handleTagsChange}
          onTagsUpdate={handleTagsUpdate}
        />
      </Popover>
    </Box>
  );
};

export default TagsComponent;
